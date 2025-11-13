# Hash-Indexed Hospital Patient Record System

A full-stack web application for managing hospital patient records with hash-indexed database storage. Built with Flask (Python) backend, React (Vite + TailwindCSS) frontend, and MySQL database.

## Features

- ✅ **Add Patient Records** - Register new patients with all necessary details
- ✅ **Search Patients** - Find patients by Patient ID
- ✅ **View All Patients** - Display all patient records in a table
- ✅ **Delete Patients** - Remove patient records from the system
- ✅ **Hash Indexing** - Automatic hash index calculation for efficient data storage
- ✅ **RESTful API** - Clean API endpoints for all operations
- ✅ **Modern UI** - Responsive design with TailwindCSS and teal theme
- ✅ **Loading States** - Visual feedback for all operations
- ✅ **Error Handling** - Comprehensive error messages
- ✅ **MySQL Database** - Robust database with indexing support

## Hash Function

The system uses a simple hash function to index patient records:
```
hash_index = sum(ord(c) for c in pid) % 10
```

This generates a hash index between 0-9 for each patient ID, which is stored in the database and indexed for fast queries.

## Project Structure

```
HashIndexed_Hospital_System/
├── backend/                 # Flask API
│   ├── app.py              # Main Flask application
│   ├── requirements.txt    # Python dependencies
│   ├── config.py           # Database configuration
│   ├── setup_database.sql  # SQL setup script
│   ├── env.example         # Environment variables template
│   └── README.md           # Backend setup guide
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── Home.jsx
│   │   │   ├── AddPatient.jsx
│   │   │   ├── SearchPatient.jsx
│   │   │   ├── ViewAllPatients.jsx
│   │   │   └── DeletePatient.jsx
│   │   ├── services/       # API service
│   │   │   └── api.js
│   │   ├── App.jsx         # Main App component
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Global styles
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Prerequisites

- **Python 3.8+** - [Download Python](https://www.python.org/downloads/)
- **Node.js 16+** - [Download Node.js](https://nodejs.org/)
- **MySQL 5.7+** or **MariaDB 10.3+** - [Download MySQL](https://dev.mysql.com/downloads/)

## Setup Instructions

### Step 1: Install MySQL

**Windows:**
1. Download MySQL Installer from https://dev.mysql.com/downloads/installer/
2. Run the installer and follow the setup wizard
3. Set a root password (remember it!)
4. Start MySQL service

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

### Step 2: Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
   
   **If `pip` is not recognized:**
   - Windows: Use `python -m pip install -r requirements.txt`
   - Or: `py -m pip install -r requirements.txt`

3. Configure database connection:
   
   Create a `.env` file in the `backend` directory:
   ```bash
   # Windows
   copy env.example .env
   
   # macOS/Linux
   cp env.example .env
   ```
   
   Edit `.env` and update with your MySQL credentials:
   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=hospital_db
   ```

4. Run the Flask server:
   ```bash
   python app.py
   ```
   
   Or:
   ```bash
   python -m flask run
   ```

   The backend API will be running at `http://127.0.0.1:5000`
   
   The database will be created automatically on first run!

### Step 3: Frontend Setup

1. Navigate to the frontend directory (in a new terminal):
   ```bash
   cd frontend
   ```

2. Install npm dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

   The frontend will be running at `http://localhost:5173`

### Step 4: Access the Application

1. Open your browser and navigate to: `http://localhost:5173`
2. The application should be fully functional!

## API Endpoints

### GET /api/patients
Fetch all patients from the database.

**Response:**
```json
{
  "success": true,
  "data": [...],
  "count": 5
}
```

### GET /api/patients/<pid>
Fetch a specific patient by ID.

**Response:**
```json
{
  "success": true,
  "data": {
    "pid": "P001",
    "name": "John Doe",
    "age": 30,
    "gender": "Male",
    "disease": "Fever",
    "doctor": "Dr. Smith",
    "hash_index": 5
  }
}
```

### POST /api/patients
Add a new patient record.

**Request Body:**
```json
{
  "pid": "P001",
  "name": "John Doe",
  "age": 30,
  "gender": "Male",
  "disease": "Fever",
  "doctor": "Dr. Smith"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Patient added successfully",
  "data": {...}
}
```

### DELETE /api/patients/<pid>
Delete a patient record by ID.

**Response:**
```json
{
  "success": true,
  "message": "Patient deleted successfully"
}
```

## Database Schema

The `patients` table has the following structure:

| Column      | Type        | Description                    |
|-------------|-------------|--------------------------------|
| pid         | VARCHAR(50) | Primary Key - Patient ID       |
| name        | VARCHAR(100)| Patient Name                   |
| age         | INT         | Patient Age                    |
| gender      | VARCHAR(20) | Patient Gender                 |
| disease     | VARCHAR(200)| Disease/Diagnosis              |
| doctor      | VARCHAR(100)| Assigned Doctor                |
| hash_index  | INT         | Hash index (0-9) - Indexed     |

## Technologies Used

### Backend
- **Flask** - Python web framework
- **Flask-CORS** - Cross-Origin Resource Sharing support
- **PyMySQL** - MySQL database connector
- **python-dotenv** - Environment variable management
- **MySQL** - Relational database management system

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **React Router** - Client-side routing

## Usage

1. Start both the backend and frontend servers (see Setup Instructions above)
2. Open your browser and navigate to `http://localhost:5173`
3. Use the navigation menu to:
   - **Home** - Overview and quick access to all features
   - **Add Patient** - Register a new patient
   - **Search** - Find a patient by ID
   - **View All** - See all patient records
   - **Delete** - Remove a patient record

## Troubleshooting

### Backend Issues

**MySQL Connection Error:**
- Ensure MySQL server is running
- Check database credentials in `.env` file
- Verify MySQL user has proper permissions
- Test connection: `mysql -u root -p`

**Port Already in Use:**
- Change port in `app.py`: `app.run(debug=True, port=5001)`

**Module Not Found:**
- Install dependencies: `pip install -r requirements.txt`
- Use virtual environment:
  ```bash
  python -m venv venv
  venv\Scripts\activate  # Windows
  source venv/bin/activate  # macOS/Linux
  ```

### Frontend Issues

**npm install fails:**
- Clear cache: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then reinstall

**API Connection Error:**
- Ensure backend is running on port 5000
- Check CORS settings in `backend/app.py`
- Verify API URL in `frontend/src/services/api.js`

## Development

### Backend Development
- The Flask server runs in debug mode by default
- Database is automatically initialized on first run
- CORS is enabled to allow frontend connections
- Environment variables are loaded from `.env` file

### Frontend Development
- Hot module replacement (HMR) is enabled
- Vite proxy is configured to forward `/api` requests to the backend
- TailwindCSS is configured with custom teal theme colors
- Responsive design for mobile and desktop

## Notes

- The database is created automatically when the backend starts for the first time
- All API responses follow a consistent format with `success` and `data`/`error` fields
- The hash index is automatically calculated when adding a patient
- Patient ID must be unique (primary key constraint)
- Hash index is indexed in the database for faster queries

## Future Improvements

- Add authentication and authorization
- Implement patient record updates (PUT endpoint)
- Add pagination for large datasets
- Export data to CSV/PDF
- Add data validation and sanitization
- Implement search by name or other fields
- Add patient photo uploads
- Add encryption for sensitive patient data
- Implement backup and restore functionality
- Add audit logging for patient record changes

## License

This project is open source and available for educational purposes.
