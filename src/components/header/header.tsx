import React from 'react';
import { Link } from "react-router-dom";

// Header component for the Human Resources application
const Header = () => {
  return (
    <nav className="bg-blue-500 px-4 py-3 dark:bg-gray-900">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo or Application Name */}
        <span className="text-white text-xl font-semibold">Human Resources</span>

        {/* Navigation Links */}
        <div className="hidden md:block">
          <ul className="flex space-x-4 text-white">
            <li>
              <Link to="/" className="hover:underline">Home</Link>
            </li>
            <li>
              <Link to="/upload" className="hover:underline">Upload</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
