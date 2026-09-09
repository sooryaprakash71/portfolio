param(
  [string]$Root = "D:\Portfolio\_PortfolioWebsite",
  [int]$Port = 8099
)

$ErrorActionPreference = "Stop"

$types = @{
  ".html" = "text/html; charset=utf-8"
  ".css"  = "text/css; charset=utf-8"
  ".js"   = "application/javascript; charset=utf-8"
  ".json" = "application/json; charset=utf-8"
  ".png"  = "image/png"
  ".jpg"  = "image/jpeg"
  ".jpeg" = "image/jpeg"
  ".gif"  = "image/gif"
  ".svg"  = "image/svg+xml"
  ".webp" = "image/webp"
  ".mp4"  = "video/mp4"
  ".pdf"  = "application/pdf"
  ".ico"  = "image/x-icon"
  ".woff2"= "font/woff2"
}

$listener = New-Object System.Net.Sockets.TcpListener([System.Net.IPAddress]::Loopback, $Port)
$listener.Start()
Write-Output "serving $Root on http://localhost:$Port/"

while ($true) {
  try {
    $client = $listener.AcceptTcpClient()
    $stream = $client.GetStream()

    $buffer = New-Object byte[] 8192
    $read = $stream.Read($buffer, 0, $buffer.Length)
    if ($read -le 0) { $client.Close(); continue }

    $request = [System.Text.Encoding]::ASCII.GetString($buffer, 0, $read)
    $firstLine = ($request -split "`r`n")[0]
    $parts = $firstLine -split " "

    if ($parts.Length -lt 2) { $client.Close(); continue }

    $urlPath = $parts[1]
    $urlPath = ($urlPath -split "\?")[0]
    $urlPath = [System.Uri]::UnescapeDataString($urlPath)

    if ($urlPath -eq "/") { $urlPath = "/index.html" }

    $relative = $urlPath.TrimStart("/") -replace "/", "\"
    $full = Join-Path $Root $relative

    $resolvedRoot = [System.IO.Path]::GetFullPath($Root)
    $resolvedFull = $null
    try { $resolvedFull = [System.IO.Path]::GetFullPath($full) } catch { }

    $ok = $false
    if ($resolvedFull -ne $null -and $resolvedFull.StartsWith($resolvedRoot) -and (Test-Path $resolvedFull -PathType Leaf)) {
      $ok = $true
    }

    if ($ok) {
      $bytes = [System.IO.File]::ReadAllBytes($resolvedFull)
      $ext = [System.IO.Path]::GetExtension($resolvedFull).ToLower()
      $ctype = "application/octet-stream"
      if ($types.ContainsKey($ext)) { $ctype = $types[$ext] }

      $header = "HTTP/1.1 200 OK`r`nContent-Type: $ctype`r`nContent-Length: $($bytes.Length)`r`nCache-Control: no-store`r`nConnection: close`r`n`r`n"
      $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($bytes, 0, $bytes.Length)
      Write-Output "200 $urlPath"
    }
    else {
      $body = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $urlPath")
      $header = "HTTP/1.1 404 Not Found`r`nContent-Type: text/plain`r`nContent-Length: $($body.Length)`r`nConnection: close`r`n`r`n"
      $headerBytes = [System.Text.Encoding]::ASCII.GetBytes($header)
      $stream.Write($headerBytes, 0, $headerBytes.Length)
      $stream.Write($body, 0, $body.Length)
      Write-Output "404 $urlPath"
    }

    $stream.Flush()
    $stream.Close()
    $client.Close()
  }
  catch {
    Write-Output "err: $($_.Exception.Message)"
  }
}
