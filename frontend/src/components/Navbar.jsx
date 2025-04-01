import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ isLoggedIn, onLogout }) => {
  const location = useLocation();
  const colors = {
    primary: '#3B82F6',
    primaryDark: '#1D4ED8',
    dark: '#1E293B',
    text: '#F8FAFC'
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    ...(isLoggedIn 
      ? [{ path: "/dashboard", label: "Dashboard" }]
      : [
          { path: "/login", label: "Login" },
          { path: "/register", label: "Register" }
        ])
  ];

  return (
    <nav className="bg-[#1E293B] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-white">
          Boardit
        </Link>
        
        <div className="flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`px-3 py-1 rounded-md transition-colors ${
                location.pathname === link.path
                  ? 'bg-[#3B82F6] text-white'
                  : 'text-[#F8FAFC] hover:bg-[#334155]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          
          {isLoggedIn && (
            <button
              onClick={onLogout}
              className="bg-[#EF4444] hover:bg-[#DC2626] text-white px-4 py-1 rounded-md"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;