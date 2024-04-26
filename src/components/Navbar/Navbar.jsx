import React from "react";
import "./Navbar.css";
<style>
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap');
</style>
const Navbar = () => {
  return (
    <div className="navbar-body">
      <div className="navbar">
        <div className="logo">BlockShard</div>
        <div className="nav-list">
          <ul className="nav-items">
            <li>Home</li>
            <li>Features</li>
            <li>Changes</li>
            <li>Contact Us</li>
          </ul>
          <button className="Get-started-btn">Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
