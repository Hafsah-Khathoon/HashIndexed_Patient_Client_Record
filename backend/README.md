# Backend API - Hospital Patient Record System

Flask REST API with MySQL database for managing patient records.

## Prerequisites

- Python 3.8 or higher
- MySQL Server 5.7 or higher (or MariaDB 10.3+)

## Setup Instructions

### 1. Install MySQL

**Windows:**
- Download MySQL Installer from https://dev.mysql.com/downloads/installer/
- Run the installer and follow the setup wizard
- Remember your root password

**macOS:**
```bash
brew install mysql
brew services start mysql
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install mysql-server
sudo mysql_secure_installation
```

### 2. Create Database (Optional - Auto-created on first run)

You can manually create the database or let the app create it automatically:

```sql
CREATE DATABASE hospital_db;
```

Or use the provided SQL script:
```bash
mysql -u root -p < setup_database.sql
```

### 3. Install Python Dependencies

```bash
pip install -r requirements.txt
```

If `pip` is not recognized:
- Windows: Use `python -m pip install -r requirements.txt`
- Or use `py -m pip install -r requirements.txt`

### 4. Configure Database Connection

Copy `.env.example` to `.env` and update with your MySQL credentials:

```bash
cp .env.example .env
```

Edit `.env`:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=hospital_db
```

### 5. Run the Server

```bash
python app.py
```

Or:
```bash
python -m flask run
```

The API will be available at: `http://127.0.0.1:5000`

## API Endpoints

- `GET /api/patients` - Get all patients
- `GET /api/patients/<pid>` - Get patient by ID
- `POST /api/patients` - Add new patient
- `DELETE /api/patients/<pid>` - Delete patient
- `GET /api/health` - Health check

## Troubleshooting

### Connection Error
- Ensure MySQL server is running
- Check database credentials in `.env`
- Verify MySQL user has proper permissions

### Port Already in Use
- Change port in `app.py`: `app.run(debug=True, port=5001)`

### Module Not Found
- Make sure all dependencies are installed: `pip install -r requirements.txt`
- Use virtual environment: `python -m venv venv` then `venv\Scripts\activate` (Windows)

