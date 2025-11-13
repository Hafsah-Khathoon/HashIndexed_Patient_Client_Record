import { useState, useEffect } from 'react';
import { patientAPI } from '../services/api';

function ViewAllPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await patientAPI.getAllPatients();
      if (response.success) {
        setPatients(response.data);
      }
    } catch (err) {
      setError('Failed to fetch patients. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-teal-primary">All Patients</h1>
            <button
              onClick={fetchPatients}
              className="bg-teal-primary hover:bg-teal-dark text-white font-semibold py-2 px-4 rounded-md transition-colors"
            >
              Refresh
            </button>
          </div>

          {loading && (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-teal-primary"></div>
              <p className="mt-4 text-gray-600">Loading patients...</p>
            </div>
          )}

          {error && (
            <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
              {error}
            </div>
          )}

          {!loading && !error && patients.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <p className="text-xl">No patients found.</p>
              <p className="mt-2">Add a new patient to get started.</p>
            </div>
          )}

          {!loading && !error && patients.length > 0 && (
            <>
              <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-lg">
                <p className="text-sm text-teal-800">
                  📊 Showing <span className="font-bold">{patients.length}</span> patient{patients.length !== 1 ? 's' : ''} in the database
                </p>
              </div>
              <div className="overflow-x-auto -mx-4 sm:mx-0 shadow-sm rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-teal-primary">
                    <tr>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Patient ID
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Age
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden md:table-cell">
                        Disease
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider hidden lg:table-cell">
                        Doctor
                      </th>
                      <th className="px-3 sm:px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                        Hash Index
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {patients.map((patient, index) => (
                      <tr key={patient.pid} className={`hover:bg-teal-50 transition-colors ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          {patient.pid}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {patient.name}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {patient.age}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                          {patient.gender}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden md:table-cell">
                          {patient.disease}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-700 hidden lg:table-cell">
                          {patient.doctor}
                        </td>
                        <td className="px-3 sm:px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center justify-center px-3 py-1 text-sm font-bold text-white bg-teal-primary rounded-full w-8 h-8">
                            {patient.hash_index}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllPatients;

