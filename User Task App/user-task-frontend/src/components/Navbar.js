import React from 'react';

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="navbar">
      <ul>
        <li>
          <button
            className={currentPage === 'login' ? 'active' : ''}
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        </li>
        <li>
          <button
            className={currentPage === 'register' ? 'active' : ''}
            onClick={() => setCurrentPage('register')}
          >
            Register
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
