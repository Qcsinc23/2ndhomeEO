import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useState, useRef, useEffect } from 'react';

const Navigation = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-blue-700' : 'hover:bg-blue-700';
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold mb-4 md:mb-0">2ndHome Care Management</h1>
        <div className="flex items-center space-x-4">
          <Link 
            to="/dashboard" 
            className={`px-3 py-2 rounded transition-colors ${isActive('/dashboard')}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/care-plans" 
            className={`px-3 py-2 rounded transition-colors ${isActive('/care-plans')}`}
          >
            Care Plans
          </Link>
          <Link 
            to="/appointments" 
            className={`px-3 py-2 rounded transition-colors ${isActive('/appointments')}`}
          >
            Appointments
          </Link>
          
          <div className="relative ml-4" ref={dropdownRef}>
            <button 
              className="flex items-center space-x-2 px-3 py-2 rounded hover:bg-blue-700"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{user?.username}</span>
              <svg 
                className={`w-4 h-4 transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M19 9l-7 7-7-7" 
                />
              </svg>
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div className="py-1">
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
