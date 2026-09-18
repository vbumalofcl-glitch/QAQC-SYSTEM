@echo off
cd /d "%~dp0"
title QA/QC System Background Starter

:: Detect pythonw executable
where pythonw >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start "" pythonw server.py --app
    exit
)

if exist "C:\Python314\pythonw.exe" (
    start "" "C:\Python314\pythonw.exe" server.py --app
    exit
)

where python >nul 2>nul
if %ERRORLEVEL% EQU 0 (
    start "" python server.py --app
    exit
)

echo [ERROR] Python / pythonw was not found on your system.
echo Please ensure Python 3.8+ is installed.
pause
exit /b 1
