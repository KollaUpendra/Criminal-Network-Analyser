# SENTINEL One-Command PowerShell Launcher
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "  SENTINEL - Criminal Network Analyser Launcher" -ForegroundColor Yellow
Write-Host "===================================================" -ForegroundColor Cyan
Write-Host "Launching Backend API (FastAPI) & Frontend Console (Next.js)...`n" -ForegroundColor Green

Start-Process powershell -ArgumentList "-NoExit", "-Command", "python -m uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "Set-Location frontend; npm run dev"

Write-Host "SENTINEL System Online:" -ForegroundColor Green
Write-Host "  -> Front Page & Dashboard: http://localhost:3000" -ForegroundColor Cyan
Write-Host "  -> Backend API Docs:    http://localhost:8000/api/docs`n" -ForegroundColor Cyan
Write-Host "===================================================" -ForegroundColor Cyan

Start-Sleep -Seconds 3
Start-Process "http://localhost:3000"
