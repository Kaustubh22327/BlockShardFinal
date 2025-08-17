import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <div className="navbar-body">
      <div className="navbar">
        <div className="logo">BlockShard</div>
        <div className="nav-list">
          <ul className="nav-items">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/#features">Features</Link></li>
            <li><Link to="/#changelog">Changes</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
          <Link to="/redirect" className="Get-started-btn">Get Started</Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
