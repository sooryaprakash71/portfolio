@echo off
rem  Double-click to preview the portfolio at http://localhost:8099/
rem  Starts the local server if it is not already running, then opens the page.
rem  To stop the server, close the "Portfolio preview server" window.
rem
rem  Use this rather than opening index.html directly: pages opened straight
rem  from a file cannot play the YouTube videos.

setlocal
set "PORT=8099"
set "URL=http://localhost:%PORT%/"

rem  Already running? Then just open the page.
call :ping 2
if not errorlevel 1 goto open

echo Starting the preview server...
start "Portfolio preview server" /min powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0serve.ps1" -Port %PORT%

rem  Wait until it answers, up to about 20 seconds.
for /l %%i in (1,1,20) do (
  call :ping 1
  if not errorlevel 1 goto open
  timeout /t 1 /nobreak >nul
)

echo.
echo The server did not start. Look at the "Portfolio preview server" window
echo for the error. If another program is using port %PORT%, close it and retry.
pause
exit /b 1

:open
start "" "%URL%"
endlocal
exit /b 0

rem  Exit code 0 if the server answers within %1 seconds, 1 if not.
:ping
powershell -NoProfile -Command "try { Invoke-WebRequest -Uri '%URL%' -UseBasicParsing -TimeoutSec %1 | Out-Null; exit 0 } catch { exit 1 }"
exit /b %errorlevel%
