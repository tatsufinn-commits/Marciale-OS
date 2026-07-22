Set-Location -LiteralPath $PSScriptRoot
$url = 'http://127.0.0.1:8000/?hub_launch=' + (Get-Date).Ticks
Write-Host "Starting Hub at $url" -ForegroundColor Green
Write-Host "Opening in Google Chrome if installed." -ForegroundColor Green
Write-Host "Keep this window open while using Hub. Press Ctrl+C to stop." -ForegroundColor Yellow
Start-Job -ScriptBlock {
  param($Url)
  Start-Sleep -Seconds 1
  $paths = @(
    "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
    "${env:ProgramFiles(x86)}\Google\Chrome\Application\chrome.exe",
    "$env:LocalAppData\Google\Chrome\Application\chrome.exe"
  )
  $chrome = $paths | Where-Object { Test-Path $_ } | Select-Object -First 1
  if ($chrome) { Start-Process $chrome -ArgumentList @('--new-window', $Url) }
  else { Start-Process $Url }
} -ArgumentList $url | Out-Null
if (Get-Command py -ErrorAction SilentlyContinue) {
  py server.py
} else {
  python server.py
}
