@echo off
title Stop QA/QC Background Server
cd /d "%~dp0"
echo ======================================================================
echo   FCLaranang Dev Corp QA/QC Executive Management System
echo   Stopping Local Background Server...
echo ======================================================================

:: Attempt clean shutdown via API first
powershell -NoProfile -Command "try { (Invoke-WebRequest -Uri 'http://127.0.0.1:8000/api/shutdown' -Method POST -TimeoutSec 1 -UseBasicParsing) | Out-Null; Write-Host '[OK] Sent graceful shutdown signal.' } catch { }"

:: Force terminate any lingering pythonw running server.py
powershell -NoProfile -Command "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -like '*server.py*' } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force; Write-Host ('[STOPPED] Terminated process ' + $_.ProcessId) }"

echo.
echo QA/QC Server stopped.
exit /b 0
