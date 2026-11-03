@echo off
chcp 65001 >nul
title Kiem tra Chat luong Du an EduLearn - MSSV: 6651071041
color 0F
cd /d "%~dp0"
set "PATH=C:\Program Files\nodejs;C:\Users\LAPTOP LENOVO\AppData\Local\Programs\nodejs;%PATH%"

echo =========================================================================
echo       KIỂM TRA CHẤT LƯỢNG MÃ NGUỒN TỰ ĐỘNG - MSSV: 6651071041
echo =========================================================================
echo.

echo -------------------------------------------------------------------------
echo [1/4] KIỂM TRA TYPESCRIPT STRICT (npx tsc --noEmit)
echo -------------------------------------------------------------------------
call npx.cmd tsc --noEmit
if %errorlevel% equ 0 (
    echo [OK] TypeScript: 0 LỖI (strict: true, không dùng any).
) else (
    echo [LỖI] Có lỗi TypeScript!
)
echo.

echo -------------------------------------------------------------------------
echo [2/4] KIỂM TRA ESLINT (npx eslint .)
echo -------------------------------------------------------------------------
call npx.cmd eslint .
if %errorlevel% equ 0 (
    echo [OK] ESLint: 0 LỖI, 0 CẢNH BÁO.
) else (
    echo [LỖI] Có lỗi ESLint!
)
echo.

echo -------------------------------------------------------------------------
echo [3/4] CHẠY UNIT TEST VITEST (npm run test)
echo -------------------------------------------------------------------------
call npm.cmd run test
echo.

echo -------------------------------------------------------------------------
echo [4/4] KIỂM TRA PRODUCTION BUILD (npm run build)
echo -------------------------------------------------------------------------
call npm.cmd run build
echo.

echo =========================================================================
echo   HOÀN THÀNH TẤT CẢ CÁC BƯỚC KIỂM TRA! (BẠN CÓ THỂ CHỤP ẢNH MÀN HÌNH NÀY)
echo =========================================================================
pause
