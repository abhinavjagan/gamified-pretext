#!/usr/bin/env pwsh
param(
    [string]$ServerHost = "127.0.0.1",
    [int]$ServerPort = 3000
)

$ErrorActionPreference = "Stop"

# Check if port is in use and kill the process
try {
    $netstat = netstat -ano | Select-String ":$ServerPort\s"
    if ($netstat) {
        $pid = ($netstat -split '\s+')[-1]
        Write-Host "Killing process on port $ServerPort (PID: $pid)"
        Stop-Process -Id $pid -Force -ErrorAction SilentlyContinue
        Start-Sleep -Seconds 1
    }
} catch {
    # Port not in use, continue
}

# Build the client
Write-Host "Building client..."
npm run build:client

# Start the server
Write-Host "Starting server on $ServerHost`:$ServerPort..."
$env:HOST = $ServerHost
$env:PORT = $ServerPort
npx bun run ./scripts/serve-static.ts
