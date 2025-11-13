import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import AddPatient from './components/AddPatient';
import SearchPatient from './components/SearchPatient';
import ViewAllPatients from './components/ViewAllPatients';
import DeletePatient from './components/DeletePatient';
import Footer from './components/Footer';

function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path ? 'bg-teal-dark' : '';
  };

  return (
    <nav className="bg-teal-primary shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex items-center px-2 sm:px-4 text-white font-bold text-lg sm:text-xl hover:text-teal-100 transition-colors">
              <span className="hidden sm:inline">🏥 Hospital Patient Record System</span>
              <span className="sm:hidden">🏥 Hospital System</span>
            </Link>
          </div>
          <div className="flex flex-wrap items-center space-x-1">
            <Link
              to="/"
              className={`text-white hover:bg-teal-dark px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${isActive('/')}`}
            >
              Home
            </Link>
            <Link
              to="/add"
              className={`text-white hover:bg-teal-dark px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${isActive('/add')}`}
            >
              Add
            </Link>
            <Link
              to="/search"
              className={`text-white hover:bg-teal-dark px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${isActive('/search')}`}
            >
              Search
            </Link>
            <Link
              to="/view"
              className={`text-white hover:bg-teal-dark px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${isActive('/view')}`}
            >
              View
            </Link>
            <Link
              to="/delete"
              className={`text-white hover:bg-teal-dark px-2 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${isActive('/delete')}`}
            >
              Delete
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 flex flex-col">
        <Navigation />
        <main className="flex-grow max-w-7xl w-full mx-auto py-6 sm:px-6 lg:px-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddPatient />} />
            <Route path="/search" element={<SearchPatient />} />
            <Route path="/view" element={<ViewAllPatients />} />
            <Route path="/delete" element={<DeletePatient />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

