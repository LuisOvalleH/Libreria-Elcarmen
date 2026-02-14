param(
  [string]$Ip = "",
  [int]$FrontendPort = 5174,
  [int]$BackendPort = 8000
)

$ErrorActionPreference = "Stop"
$repoRoot = Split-Path -Parent $PSScriptRoot
$frontendDir = Join-Path $repoRoot "frontend"
$backendDir = Join-Path $repoRoot "backend"

if (-not $Ip) {
  $candidates = Get-NetIPAddress -AddressFamily IPv4 |
    Where-Object {
      $_.IPAddress -notlike "169.254.*" -and
      $_.IPAddress -notlike "127.*" -and
      $_.InterfaceAlias -notlike "vEthernet*" -and
      $_.InterfaceAlias -notlike "VirtualBox*" -and
      $_.InterfaceAlias -notlike "VMware*"
    } |
    Sort-Object -Property SkipAsSource

  $Ip = $candidates[0].IPAddress
}

if (-not $Ip) {
  throw "No se pudo detectar una IP local valida. Pasa una IP manual con -Ip."
}

$frontendCmd = @"
`$env:VITE_API_URL='http://$Ip`:$BackendPort';
Set-Location '$frontendDir';
npm run dev -- --host 0.0.0.0 --port $FrontendPort
"@

$backendCmd = @"
`$env:DJANGO_ALLOWED_HOSTS='localhost,127.0.0.1,$Ip';
`$env:DJANGO_CORS_ALLOWED_ORIGINS='http://localhost:$FrontendPort,http://$Ip`:$FrontendPort';
Set-Location '$backendDir';
python manage.py runserver 0.0.0.0:$BackendPort
"@

Start-Process powershell -ArgumentList "-NoExit", "-Command", $backendCmd | Out-Null
Start-Process powershell -ArgumentList "-NoExit", "-Command", $frontendCmd | Out-Null

Write-Host ""
Write-Host "Servicios iniciados para red local:"
Write-Host "Frontend: http://$Ip`:$FrontendPort"
Write-Host "Backend:  http://$Ip`:$BackendPort"
Write-Host ""
Write-Host "Comparte el frontend en esa URL con clientes en tu misma red."
