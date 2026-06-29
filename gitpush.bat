@echo off
cd /d "%~dp0"
git add -A
git commit -m "auto-update %date% %time%"
git push
if %errorlevel%==0 (
    echo ^(^) Git Push Successful!
) else (
    echo ^(^) Git Push Failed - Check errors above
)
pause
