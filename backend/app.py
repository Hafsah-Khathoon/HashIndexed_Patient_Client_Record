from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Database configuration
DB_CONFIG = {
    'host': os.getenv('DB_HOST', 'localhost'),
    'user': os.getenv('DB_USER', 'root'),
    'password': os.getenv('DB_PASSWORD', ''),
    'database': os.getenv('DB_NAME', 'hospital_db'),
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def get_db_connection():
    """Get MySQL database connection"""
    return pymysql.connect(**DB_CONFIG)

def init_db():
    """Initialize the database with patients table"""
    try:
        # First, connect without database to create it
        db_name = DB_CONFIG['database']
        temp_config = DB_CONFIG.copy()
        temp_config.pop('database', None)  # Remove database from temp config
        
        conn = pymysql.connect(**temp_config)
        with conn.cursor() as cursor:
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {db_name}")
            conn.select_db(db_name)
            
            # Create patients table
            cursor.execute('''CREATE TABLE IF NOT EXISTS patients (
                                pid VARCHAR(50) PRIMARY KEY,
                                name VARCHAR(100) NOT NULL,
                                age INT NOT NULL,
                                gender VARCHAR(20) NOT NULL,
                                disease VARCHAR(200) NOT NULL,
                                doctor VARCHAR(100) NOT NULL,
                                hash_index INT NOT NULL,
                                INDEX idx_hash_index (hash_index)
                            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci''')
        conn.commit()
        conn.close()
        
        print(f"✅ Database '{db_name}' initialized successfully!")
    except Exception as e:
        print(f"❌ Error initializing database: {e}")
        print(f"💡 Make sure MySQL is running and credentials in .env are correct")
        raise

def hash_function(pid):
    """Calculate hash index: sum(ord(c) for c in pid) % 10"""
    return sum(ord(c) for c in pid) % 10

@app.route('/api/patients', methods=['GET'])
def get_all_patients():
    """GET /api/patients - Fetch all patients"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT pid, name, age, gender, disease, doctor, hash_index FROM patients ORDER BY pid")
            patients = cursor.fetchall()
        conn.close()
        
        # Convert tuple results to list of dicts
        patients_list = [dict(patient) for patient in patients]
        
        return jsonify({
            'success': True,
            'data': patients_list,
            'count': len(patients_list)
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/patients/<pid>', methods=['GET'])
def get_patient_by_id(pid):
    """GET /api/patients/<pid> - Fetch patient by ID"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("SELECT pid, name, age, gender, disease, doctor, hash_index FROM patients WHERE pid=%s", (pid,))
            patient = cursor.fetchone()
        conn.close()
        
        if patient:
            return jsonify({
                'success': True,
                'data': dict(patient)
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Patient not found'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/patients', methods=['POST'])
def add_patient():
    """POST /api/patients - Add a new patient"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({
                'success': False,
                'error': 'No data provided'
            }), 400
        
        # Validate required fields
        required_fields = ['pid', 'name', 'age', 'gender', 'disease', 'doctor']
        for field in required_fields:
            if field not in data or not str(data[field]).strip():
                return jsonify({
                    'success': False,
                    'error': f'Missing or empty required field: {field}'
                }), 400
        
        pid = str(data['pid']).strip()
        name = str(data['name']).strip()
        
        # Validate age
        try:
            age = int(data['age'])
            if age < 1 or age > 150:
                return jsonify({
                    'success': False,
                    'error': 'Age must be between 1 and 150'
                }), 400
        except (ValueError, TypeError):
            return jsonify({
                'success': False,
                'error': 'Invalid age value. Age must be a number'
            }), 400
        
        gender = str(data['gender']).strip()
        disease = str(data['disease']).strip()
        doctor = str(data['doctor']).strip()
        hash_index = hash_function(pid)
        
        conn = get_db_connection()
        with conn.cursor() as cursor:
            # Check if patient already exists
            cursor.execute("SELECT pid FROM patients WHERE pid=%s", (pid,))
            if cursor.fetchone():
                conn.close()
                return jsonify({
                    'success': False,
                    'error': 'Patient ID already exists'
                }), 409
            
            # Insert new patient
            cursor.execute("""INSERT INTO patients (pid, name, age, gender, disease, doctor, hash_index) 
                            VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                         (pid, name, age, gender, disease, doctor, hash_index))
        conn.commit()
        conn.close()
        
        return jsonify({
            'success': True,
            'message': 'Patient added successfully',
            'data': {
                'pid': pid,
                'name': name,
                'age': age,
                'gender': gender,
                'disease': disease,
                'doctor': doctor,
                'hash_index': hash_index
            }
        }), 201
    except ValueError:
        return jsonify({
            'success': False,
            'error': 'Invalid age value'
        }), 400
    except pymysql.IntegrityError:
        return jsonify({
            'success': False,
            'error': 'Patient ID already exists'
        }), 409
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/patients/<pid>', methods=['DELETE'])
def delete_patient(pid):
    """DELETE /api/patients/<pid> - Delete patient by ID"""
    try:
        conn = get_db_connection()
        with conn.cursor() as cursor:
            cursor.execute("DELETE FROM patients WHERE pid=%s", (pid,))
            deleted_count = cursor.rowcount
        conn.commit()
        conn.close()
        
        if deleted_count > 0:
            return jsonify({
                'success': True,
                'message': 'Patient deleted successfully'
            }), 200
        else:
            return jsonify({
                'success': False,
                'error': 'Patient not found'
            }), 404
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    try:
        conn = get_db_connection()
        conn.close()
        return jsonify({
            'success': True,
            'message': 'API is running and database connection is healthy'
        }), 200
    except Exception as e:
        return jsonify({
            'success': False,
            'message': 'API is running but database connection failed',
            'error': str(e)
        }), 503

if __name__ == '__main__':
    print("=" * 60)
    print("🚀 Hospital Patient Record System API")
    print("=" * 60)
    print(f"📊 Database: {DB_CONFIG['database']} @ {DB_CONFIG['host']}")
    print(f"👤 User: {DB_CONFIG['user']}")
    try:
        init_db()
        print("✅ Database initialized successfully!")
        print("🌐 Server running on http://127.0.0.1:5000")
        print("📡 API endpoints available at http://127.0.0.1:5000/api")
        print("=" * 60)
        app.run(debug=True, port=5000, host='127.0.0.1')
    except Exception as e:
        print(f"❌ Failed to start server: {e}")
        print("💡 Please check your MySQL connection and .env configuration")
        exit(1)
