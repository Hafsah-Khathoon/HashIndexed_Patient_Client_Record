@echo off
echo ========================================
echo Hospital System - Backend Setup
echo ========================================
echo.

echo Step 1: Installing Python dependencies...
python -m pip install -r requirements.txt
if errorlevel 1 (
    echo Error: Failed to install dependencies
    echo Trying with 'pip' command...
    pip install -r requirements.txt
)

echo.
echo Step 2: Setting up environment file...
if not exist .env (
    copy env.example .env
    echo Created .env file. Please edit it with your MySQL credentials.
) else (
    echo .env file already exists.
)

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env file with your MySQL credentials
echo 2. Make sure MySQL server is running
echo 3. Run: python app.py
echo.
pause

