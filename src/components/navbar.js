import React, { useState } from "react";
import "./navbar.css";
import logo from "../img/LOGO.png";

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="header">
      <a href="/" className="logo">
        <img src={logo} alt="Logo" />
      </a>

      <nav className="navbar">
        <a href="/" className="nav-link">
          Home
        </a>
        <div className="nav-link dropdown">
          <a className="nav-link" onClick={toggleDropdown}>
            Atividades
          </a>
          {dropdownOpen && (
            <div className="dropdown-content">
              <a href="/Inicio">QUIZ</a>

            </div>
          )}
        </div>
        <a href="/Sobre" className="nav-link">
          Sobre
        </a>
      </nav>

    </header>
  );
};

export default Navbar;
