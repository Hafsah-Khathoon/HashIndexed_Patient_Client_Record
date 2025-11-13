import { useState } from 'react';
import { patientAPI } from '../services/api';

function SearchPatient() {
  const [pid, setPid] = useState('');
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!pid.trim()) {
      setError('Please enter a Patient ID');
      return;
    }

    setLoading(true);
    setError('');
    setPatient(null);

    try {
      const response = await patientAPI.getPatientById(pid.trim());
      if (response.success) {
        setPatient(response.data);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Patient not found');
      setPatient(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-teal-primary mb-6">Search Patient</h1>
          
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex gap-2">
              <input
                type="text"
                value={pid}
                onChange={(e) => setPid(e.target.value)}
                placeholder="Enter Patient ID"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-primary"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-teal-primary hover:bg-teal-dark text-white font-semibold py-2 px-6 rounded-md transition-colors disabled:opacity-50 shadow-md hover:shadow-lg flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Searching...
                  </>
                ) : (
                  '🔍 Search'
                )}
              </button>
            </div>
          </form>

          {loading && (
            <div className="text-center py-8">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-primary"></div>
              <p className="mt-2 text-gray-600">Searching...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg">
              {error}
            </div>
          )}

          {patient && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-teal-primary mb-4">Patient Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Patient ID</p>
                  <p className="font-semibold text-lg">{patient.pid}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-lg">{patient.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Age</p>
                  <p className="font-semibold text-lg">{patient.age}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Gender</p>
                  <p className="font-semibold text-lg">{patient.gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Disease</p>
                  <p className="font-semibold text-lg">{patient.disease}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-semibold text-lg">{patient.doctor}</p>
                </div>
                <div className="sm:col-span-2">
                  <p className="text-sm text-gray-600">Hash Index</p>
                  <p className="font-semibold text-2xl text-teal-primary">{patient.hash_index}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPatient;

