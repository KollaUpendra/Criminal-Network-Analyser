@echo off
echo ===================================================
echo   SENTINEL - Criminal Network Analyser Launcher
echo ===================================================
echo Starting FastAPI Backend and Next.js Frontend...
echo.

start "SENTINEL Backend" cmd /k "python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"
start "SENTINEL Frontend" cmd /k "cd frontend ^&^& npm run dev"

echo.
echo SENTINEL servers are launching!
echo   - Front Page and Console: http://localhost:3000
echo   - Backend API Docs:       http://localhost:8000/api/docs
echo ===================================================

:: Automatically open browser after 3 seconds
timeout /t 3 /nobreak >nul
start http://localhost:3000
