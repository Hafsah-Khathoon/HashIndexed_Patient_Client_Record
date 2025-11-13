# Quick Setup Guide

## Windows Setup

### 1. Install MySQL
- Download from: https://dev.mysql.com/downloads/installer/
- Install MySQL Server
- Remember your root password

### 2. Install Python
- Download from: https://www.python.org/downloads/
- Check "Add Python to PATH" during installation

### 3. Install Node.js
- Download from: https://nodejs.org/
- Install the LTS version

### 4. Backend Setup

Open PowerShell or Command Prompt in the project root:

```powershell
cd backend
python -m pip install -r requirements.txt
copy env.example .env
```

Edit `.env` file and add your MySQL password:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=hospital_db
```

Start the backend:
```powershell
python app.py
```

### 5. Frontend Setup

Open a NEW terminal window:

```powershell
cd frontend
npm install
npm run dev
```

### 6. Access Application

Open browser: http://localhost:5173

## macOS/Linux Setup

### 1. Install MySQL
```bash
# macOS
brew install mysql
brew services start mysql

# Linux
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### 2. Backend Setup
```bash
cd backend
pip3 install -r requirements.txt
cp env.example .env
# Edit .env with your MySQL credentials
python3 app.py
```

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## Troubleshooting

### Python not found
- Windows: Use `py` instead of `python`
- Make sure Python is in PATH

### MySQL connection error
- Check MySQL is running: `mysql -u root -p`
- Verify credentials in `.env` file
- Make sure MySQL service is started

### Port already in use
- Backend: Change port in `app.py` (line 188)
- Frontend: Vite will suggest an alternative port

## Need Help?

Check the main README.md for detailed instructions.

