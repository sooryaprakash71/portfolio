<#
  serve.ps1 — a tiny static web server for previewing this site over http://
  instead of file://. Needs nothing installed: no Node, no Python.

  Usage:  right-click → Run with PowerShell,  then open http://localhost:8099/
          or:  .\serve.ps1 -Port 8099 -Root .
          Close the window (or press Ctrl+C) to stop it.

  Built on System.Net.HttpListener rather than a raw TcpListener. That matters:
  a hand-rolled TCP loop has to block on a socket read to find out what the
  request is, and Chrome routinely opens speculative sockets it never sends on.
  One of those would wedge a single-threaded accept loop forever — the page
  would load and its CSS and JS would then hang. http.sys parses requests for
  us and only hands over complete ones, so idle sockets cost nothing.

  http://localhost:<port>/ binds fine without admin rights. A wildcard prefix
  (http://+:<port>/) would not, which is why this is localhost-only — it is a
  preview server, not something to expose to the network.
#>

param(
  [string]$Root = $PSScriptRoot,
  [int]$Port = 8099
)

$ErrorActionPreference = "Stop"

if ([string]::IsNullOrWhiteSpace($Root)) { $Root = (Get-Location).Path }

$types = @{
  ".html" = "text/html; charset=utf-8"
  ".htm"  = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".mjs"  = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".map"  = "application/json; charset=utf-8"
  ".txt"  = "text/plain; charset=utf-8"
  ".svg"  = "image/svg+xml"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".webp" = "image/webp"
  ".avif" = "image/avif"
  ".ico"  = "image/x-icon"
  ".mp4"  = "video/mp4"
  ".webm" = "video/webm"
  ".m4v"  = "video/x-m4v"
  ".mp3"  = "audio/mpeg"
  ".wav"  = "audio/wav"
  ".pdf"  = "application/pdf"
  ".woff" = "font/woff"
  ".woff2"= "font/woff2"
  ".ttf"  = "font/ttf"
  ".otf"  = "font/otf"
  ".wasm" = "application/wasm"
}

# Normalised root, with a trailing separator so the containment test below
# cannot be fooled by a sibling folder that merely shares a name prefix.
$rootFull = [System.IO.Path]::GetFullPath($Root)
$sep = [System.IO.Path]::DirectorySeparatorChar
if (-not $rootFull.EndsWith($sep)) { $rootFull += $sep }

if (-not (Test-Path $rootFull -PathType Container)) {
  Write-Output "root folder not found: $rootFull"
  exit 1
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")

try {
  $listener.Start()
}
catch {
  Write-Output "could not listen on port $Port - $($_.Exception.Message)"
  Write-Output "something else is probably using it; try  .\serve.ps1 -Port 8100"
  exit 1
}

Write-Output "serving $rootFull on http://localhost:$Port/"
Write-Output "press Ctrl+C to stop"

function Resolve-RequestedFile {
  param([string]$UrlPath)

  # HttpListener has already percent-decoded this for us.
  $relative = $UrlPath.TrimStart("/") -replace "/", "\"
  if ($relative -eq "") { $relative = "index.html" }

  $candidate = $null
  try { $candidate = [System.IO.Path]::GetFullPath((Join-Path $rootFull $relative)) }
  catch { return $null }   # illegal characters in the path

  # Refuse anything that escaped the root, e.g. /../../Windows/win.ini
  if (-not $candidate.StartsWith($rootFull, [StringComparison]::OrdinalIgnoreCase)) {
    return $null
  }

  # A directory serves its index.html, so /media/ behaves sensibly.
  if (Test-Path $candidate -PathType Container) {
    $candidate = Join-Path $candidate "index.html"
  }

  if (Test-Path $candidate -PathType Leaf) { return $candidate }
  return $null
}

try {
  while ($listener.IsListening) {

    $ctx = $listener.GetContext()

    # One bad request must never take the server down with it.
    try {
      $req = $ctx.Request
      $res = $ctx.Response
      $urlPath = $req.Url.LocalPath
      $method = $req.HttpMethod

      if ($method -ne "GET" -and $method -ne "HEAD") {
        $res.StatusCode = 405
        $res.AddHeader("Allow", "GET, HEAD")
        Write-Output "405 $method $urlPath"
        $res.Close()
        continue
      }

      $file = Resolve-RequestedFile -UrlPath $urlPath

      if ($file -eq $null) {
        $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
        $res.StatusCode = 404
        $res.ContentType = "text/plain; charset=utf-8"
        $res.ContentLength64 = $body.Length
        if ($method -eq "GET") { $res.OutputStream.Write($body, 0, $body.Length) }
        Write-Output "404 $urlPath"
        $res.Close()
        continue
      }

      $bytes = [System.IO.File]::ReadAllBytes($file)
      $ext = [System.IO.Path]::GetExtension($file).ToLower()

      $ctype = "application/octet-stream"
      if ($types.ContainsKey($ext)) { $ctype = $types[$ext] }

      $res.ContentType = $ctype
      # A preview server should never hand back yesterday's edit.
      $res.AddHeader("Cache-Control", "no-store")
      $res.AddHeader("Accept-Ranges", "bytes")

      $offset = 0
      $count = $bytes.Length
      $status = 200

      # Partial content, so seeking in a <video> works while previewing
      # gameplay clips. One range only, which is all any browser sends.
      $rangeHeader = $req.Headers["Range"]
      if ($method -eq "GET" -and $rangeHeader -match "^bytes=(\d*)-(\d*)$") {
        $startText = $matches[1]
        $endText = $matches[2]
        $valid = $true

        if ($startText -ne "") {
          $start = [int64]$startText
          if ($endText -ne "") { $end = [int64]$endText } else { $end = $bytes.Length - 1 }
        }
        elseif ($endText -ne "") {
          # bytes=-500 means "the last 500 bytes"
          $suffix = [int64]$endText
          if ($suffix -le 0) { $valid = $false }
          $start = [System.Math]::Max([int64]0, $bytes.Length - $suffix)
          $end = $bytes.Length - 1
        }
        else { $valid = $false }

        if ($valid -and $end -gt ($bytes.Length - 1)) { $end = $bytes.Length - 1 }

        if (-not $valid -or $start -gt $end -or $start -ge $bytes.Length) {
          $res.StatusCode = 416
          $res.AddHeader("Content-Range", "bytes */$($bytes.Length)")
          Write-Output "416 $urlPath"
          $res.Close()
          continue
        }

        $offset = [int]$start
        $count = [int]($end - $start + 1)
        $status = 206
        $res.AddHeader("Content-Range", "bytes $start-$end/$($bytes.Length)")
      }

      $res.StatusCode = $status
      $res.ContentLength64 = $count

      # HEAD gets every header and no body.
      if ($method -eq "GET") {
        $res.OutputStream.Write($bytes, $offset, $count)
      }

      Write-Output "$status $urlPath"
      $res.Close()
    }
    catch {
      # Usually just the browser hanging up mid-response. Log and carry on.
      Write-Output "err: $($_.Exception.Message)"
      try { $ctx.Response.Abort() } catch { }
    }
  }
}
finally {
  # Reached on Ctrl+C too, so the port is released cleanly.
  if ($listener.IsListening) { $listener.Stop() }
  $listener.Close()
  Write-Output "stopped"
}
