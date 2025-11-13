import { useState } from 'react';
import { patientAPI } from '../services/api';

function DeletePatient() {
  const [pid, setPid] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  const handleDelete = async (e) => {
    e.preventDefault();
    if (!pid.trim()) {
      setMessage({ type: 'error', text: 'Please enter a Patient ID' });
      return;
    }

    if (!window.confirm(`Are you sure you want to delete patient ${pid}? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const response = await patientAPI.deletePatient(pid.trim());
      if (response.success) {
        setMessage({ type: 'success', text: 'Patient deleted successfully!' });
        setPid('');
      }
    } catch (error) {
      setMessage({
        type: 'error',
        text: error.response?.data?.error || 'Failed to delete patient. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-teal-primary mb-6">Delete Patient</h1>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-yellow-800">
              ⚠️ Warning: This action cannot be undone. Please double-check the Patient ID before deleting.
            </p>
          </div>

          {message.text && (
            <div
              className={`p-4 rounded-lg mb-6 ${
                message.type === 'success'
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {message.text}
            </div>
          )}

          <form onSubmit={handleDelete} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID *
              </label>
              <input
                type="text"
                value={pid}
                onChange={(e) => setPid(e.target.value)}
                required
                placeholder="Enter Patient ID to delete"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Deleting...' : 'Delete Patient'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default DeletePatient;

