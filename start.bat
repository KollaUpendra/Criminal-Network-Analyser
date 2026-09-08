@echo off
setlocal

echo ===================================================
echo   SENTINEL - Criminal Network Analyser Launcher
echo ===================================================
echo.

REM ===================================================
REM 1. Check Python
REM ===================================================
python --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not available in PATH.
    echo Please install Python and try again.
    pause
    exit /b 1
)

REM ===================================================
REM 2. Create virtual environment if it doesn't exist
REM ===================================================
if not exist "venv\Scripts\python.exe" (
    echo Creating Python virtual environment...
    python -m venv venv

    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment.
        pause
        exit /b 1
    )

    echo Virtual environment created successfully.
) else (
    echo Virtual environment already exists.
)

echo.

REM ===================================================
REM 3. Install Python dependencies
REM ===================================================
echo Installing Python dependencies...
venv\Scripts\python.exe -m pip install -r requirements.txt

if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies.
    pause
    exit /b 1
)

echo Python dependencies ready.
echo.

REM ===================================================
REM 4. Check Node.js
REM ===================================================
node --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not available in PATH.
    echo Please install Node.js and try again.
    pause
    exit /b 1
)

REM ===================================================
REM 5. Install frontend dependencies
REM ===================================================
if not exist "frontend\node_modules" (
    echo Installing frontend dependencies...
    cd frontend
    npm install

    if errorlevel 1 (
        echo ERROR: Failed to install frontend dependencies.
        cd ..
        pause
        exit /b 1
    )

    cd ..
    echo Frontend dependencies installed.
) else (
    echo Frontend dependencies already exist.
)

echo.
echo ===================================================
echo Starting FastAPI Backend and Next.js Frontend...
echo ===================================================
echo.

REM ===================================================
REM 6. Start Backend
REM ===================================================
start "SENTINEL Backend" cmd /k "venv\Scripts\python.exe -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"

REM ===================================================
REM 7. Start Frontend
REM ===================================================
start "SENTINEL Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo SENTINEL servers are launching!
echo   - Front Page and Console: http://localhost:3000
echo   - Backend API Docs:       http://localhost:8000/api/docs
echo ===================================================

REM ===================================================
REM 8. Open browser
REM ===================================================
timeout /t 3 /nobreak >nul
start http://localhost:3000

endlocal