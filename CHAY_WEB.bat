@echo off
chcp 65001 >nul
title EduLearn - Khoi dong Website Buoi 2
echo ===================================================
echo     DANG KHOI DONG WEBSITE EDULEARN (MSSV: 6651071041)
echo ===================================================
echo.
set "PATH=C:\Users\LAPTOP LENOVO\AppData\Local\Programs\nodejs;%PATH%"
cd /d "%~dp0"
echo Dang khoi chay may chu Vite React tai http://localhost:5173 ...
echo Trinh duyet se tu dong mo len trong giay lat!
echo.
echo (De dung website, ban co the dong cua so nay hoac an Ctrl + C)
echo.
npm run dev -- --open
pause
