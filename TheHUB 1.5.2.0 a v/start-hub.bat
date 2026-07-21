@echo off
setlocal
cd /d "%~dp0"
title Hub Local Server
echo.
echo Starting Hub at http://127.0.0.1:8000
echo Opening in Google Chrome if installed.
echo Keep this window open while using Hub. Press Ctrl+C to stop.
echo.
start "" /B powershell -NoProfile -ExecutionPolicy Bypass -Command "$url='http://127.0.0.1:8000/?hub_launch='+(Get-Date).Ticks; Start-Sleep -Seconds 1; $paths=@($env:ProgramFiles+'\Google\Chrome\Application\chrome.exe', ${env:ProgramFiles(x86)}+'\Google\Chrome\Application\chrome.exe', $env:LocalAppData+'\Google\Chrome\Application\chrome.exe'); $chrome=$paths | Where-Object { Test-Path $_ } | Select-Object -First 1; if($chrome){ Start-Process $chrome -ArgumentList @('--new-window',$url) } else { Start-Process $url }"
where py >nul 2>nul
if %errorlevel%==0 (
  py server.py
) else (
  python server.py
)
echo.
echo Hub server stopped.
pause
