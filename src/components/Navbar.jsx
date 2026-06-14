import React from 'react'
import './Navbar.css'

const Navbar = () => {
  return (
    <header className="navbar-wrapper">

      <nav className="navbar">

       

        <ul className="nav-links">

          <li>
            <a href="#home">Home</a>
          </li>

          <li>
            <a href="#memories">Wishes</a>
          </li>
          <li>
            <a href="#gifts">Letter</a>
          </li>

          <li>
            <a href="#game">Game</a>
          </li>


        </ul>

        

      </nav>

    </header>
  )
}

export default Navbar