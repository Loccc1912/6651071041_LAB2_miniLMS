@echo off
chcp 65001 >nul
title EduLearn - Chay Ban Production Preview (Lighthouse Test)
echo =========================================================================
echo       KHOI DONG BAN SAN XUAT DE DO LIGHTHOUSE DIEM CAO (MSSV: 6651071041)
echo =========================================================================
echo.
set "PATH=C:\Program Files\nodejs;C:\Users\LAPTOP LENOVO\AppData\Local\Programs\nodejs;%PATH%"
cd /d "%~dp0"

echo [1/2] Dang dong goi toi uu ma nguon (npm run build)...
call npm.cmd run build
if %errorlevel% neq 0 (
    echo [LOI] Build that bai!
    pause
    exit /b %errorlevel%
)
echo [OK] Build thanh cong!
echo.
echo [2/2] Dang khoi chay may chu Preview tai http://localhost:4173 ...
echo Trinh duyet se tu dong mo len. Hay chay Lighthouse Mobile tai day de dat diem 90-100!
echo.
call npm.cmd run preview -- --open
pause
