import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="px-4 py-4 sm:py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-4 sm:p-8">
          <h1 className="text-2xl sm:text-4xl font-bold text-teal-primary mb-4 text-center">
            Hash-Indexed Hospital Patient Record System
          </h1>
          <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
            Manage patient records with hash-indexed database storage
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
            <Link
              to="/add"
              className="bg-teal-primary hover:bg-teal-dark text-white p-4 sm:p-6 rounded-lg shadow-md transition-colors text-center"
            >
              <div className="text-3xl mb-2">➕</div>
              <h2 className="text-lg sm:text-xl font-semibold">Add Patient</h2>
              <p className="text-xs sm:text-sm mt-2 opacity-90">Register a new patient record</p>
            </Link>
            
            <Link
              to="/search"
              className="bg-teal-light hover:bg-teal-primary text-white p-4 sm:p-6 rounded-lg shadow-md transition-colors text-center"
            >
              <div className="text-3xl mb-2">🔍</div>
              <h2 className="text-lg sm:text-xl font-semibold">Search Patient</h2>
              <p className="text-xs sm:text-sm mt-2 opacity-90">Find a patient by ID</p>
            </Link>
            
            <Link
              to="/view"
              className="bg-teal-light hover:bg-teal-primary text-white p-4 sm:p-6 rounded-lg shadow-md transition-colors text-center"
            >
              <div className="text-3xl mb-2">📋</div>
              <h2 className="text-lg sm:text-xl font-semibold">View All Patients</h2>
              <p className="text-xs sm:text-sm mt-2 opacity-90">View all patient records</p>
            </Link>
            
            <Link
              to="/delete"
              className="bg-red-500 hover:bg-red-600 text-white p-4 sm:p-6 rounded-lg shadow-md transition-colors text-center"
            >
              <div className="text-3xl mb-2">🗑️</div>
              <h2 className="text-lg sm:text-xl font-semibold">Delete Patient</h2>
              <p className="text-xs sm:text-sm mt-2 opacity-90">Remove a patient record</p>
            </Link>
          </div>
          
          <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-teal-primary mb-2 text-sm sm:text-base">About Hash Indexing</h3>
            <p className="text-xs sm:text-sm text-gray-700">
              This system uses a hash function to index patient records: <code className="bg-gray-200 px-2 py-1 rounded text-xs">hash_index = sum(ord(c) for c in pid) % 10</code>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

