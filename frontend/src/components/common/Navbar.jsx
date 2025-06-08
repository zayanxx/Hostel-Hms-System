import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Bars3Icon } from "@heroicons/react/24/outline";
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

const Navbar = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const role = user?.role || 'guest';

  const handleLogout = async () => {
    try {
      await logout(); // assuming logout returns a promise
      setMenuOpen(false);
      navigate('/login'); // redirect to login after logout
    } catch (error) {
      console.error('Logout failed:', error);
      // Optionally show error to user
    }
  };

  const showSidebarToggle = role === 'admin' || role === 'resident';

  // Determine home path based on role
  const homePath =
    role === 'admin'
      ? '/admin'
      : role === 'resident'
      ? '/resident'
      : role === 'student'
      ? '/student'
      : '/';

  return (
    <nav className="bg-gray-900 text-white shadow-md flex items-center justify-between px-4 md:px-6 py-4 sticky top-0 z-50 w-full">
      {/* Left: Logo & Sidebar toggle */}
      <div className="flex items-center gap-4">
        {showSidebarToggle && (
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-white hover:text-blue-500 focus:outline-none"
            aria-label="Toggle Sidebar"
          >
            <Bars3Icon className="w-7 h-7" />
          </button>
        )}
        <Link
          to={homePath}
          className="flex items-center font-bold text-xl md:text-2xl text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-8 mr-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347M4.26 10.147a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814M4.26 10.147A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zM6.75 15v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
            />
          </svg>
          HMS
        </Link>
      </div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center gap-6">
        {role === 'guest' ? (
          <>
            <Link to="/" className="hover:text-blue-400 transition">
              Home
            </Link>
            <Link to="/about" className="hover:text-blue-400 transition">
              About
            </Link>
            <Link to="/contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition"
            >
              Login
            </Link>
          </>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <FaUserCircle className="text-2xl text-blue-500" />
              <span className="hidden sm:inline">{user?.name || 'User'}</span>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded transition"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        )}
      </div>

      {/* Mobile Toggle (only for guests) */}
      {role === 'guest' && (
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white z-50"
          aria-label="Toggle Mobile Menu"
        >
          <Bars3Icon className="w-7 h-7" />
        </button>
      )}

      {/* Mobile Menu (overlay) */}
      {menuOpen && role === 'guest' && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 text-white flex flex-col items-center justify-center space-y-8 text-xl z-40 transition-all duration-300">
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute top-6 right-6 text-3xl"
            aria-label="Close Mobile Menu"
          >
            &times;
          </button>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            About
          </Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            Contact
          </Link>
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="bg-blue-600 px-6 py-2 rounded"
          >
            Login
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
