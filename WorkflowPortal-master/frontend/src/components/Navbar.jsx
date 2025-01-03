import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase } from 'lucide-react';

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token');

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Briefcase className="h-8 w-8" />
          <span className="text-xl font-bold">Workflow Portal</span>
        </Link>
        <div className="space-x-4">
          <Link to="/" className="hover:text-blue-200">Home</Link>
          {isLoggedIn && (
            <>
              <Link to="/new" className="hover:text-blue-200">Post Job</Link>
              <Link to="/myjobs" className="hover:text-blue-200">My Jobs</Link>
            </>
          )}
          {isLoggedIn ? (
            <button onClick={() => {
              localStorage.removeItem('token');
              window.location.href = '/';
            }} className="hover:text-blue-200">Logout</button>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/signup" className="hover:text-blue-200">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;