@echo off
title FCLaranang Dev Corp QA/QC Executive Management System
echo ======================================================================
echo   FCLaranang Dev Corp QA/QC Executive Management System
echo   Starting Dynamic Local Backend Server...
echo ======================================================================
echo.

cd /d "%~dp0"
python server.py

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [ERROR] Python was not found or failed to start.
    echo Please make sure Python 3.8+ is installed on your computer.
    echo.
    pause
)
