import React from 'react'
import './Navbar.css'

const Navbar = () => {
  // Add smooth scrolling function
  const handleNavigation = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <header className="navbar-wrapper">
      <nav className="navbar">
        <ul className="nav-links">
          <li>
            <a href="#hero" onClick={(e) => handleNavigation(e, 'hero')}>Home</a>
          </li>
          <li>
            <a href="#wishes" onClick={(e) => handleNavigation(e, 'wishes')}>Wishes</a>
          </li>
          <li>
            <a href="#gifts" onClick={(e) => handleNavigation(e, 'gifts')}>Letter</a>
          </li>
          <li>
            <a href="#game" onClick={(e) => handleNavigation(e, 'game')}>Game</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar