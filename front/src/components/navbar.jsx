import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">MinhaLogo</div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/sobre">Sobre</a></li>
        <li><a href="/contato">Contato</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;