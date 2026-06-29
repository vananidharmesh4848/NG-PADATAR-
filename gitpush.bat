@echo off
cd /d "%~dp0"
echo ========================================
echo  Git Push - NG PADATAR
echo ========================================
echo.

git add -A
git commit -m "auto-update %date% %time%" --allow-empty

echo Pulling latest from GitHub...
git pull --rebase origin main

echo Pushing to GitHub...
git push origin main

echo.
if %errorlevel%==0 (
  color 2F
  echo SUCCESS: Pushed to GitHub!
) else (
  color 4F
  echo FAILED: See error above.
)
echo.
pause
