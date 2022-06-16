import React, { useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import logo from './logo.png';

export default function NavbarAdmin() {
  const [open, setOpen] = useState(false);
  return (
    
    <nav>
      <img src={logo} alt="Logo" width={74} height={74}/>
      <div className="header">
        <NavLink to="/">
          <i className="fab fa-hive" /> 
           Admin
        </NavLink>
      </div>
      <ul
        className="navbar-links"
        style={{ transform: open ? "translateX(0px)" : "" }}
      >
        <li>
          <NavLink to="/Verification" activeClassName="nav-active">
          <i class="fas fa-question-circle"></i> Verification
          </NavLink>
        </li>
        <li>
          <NavLink to="/AddCandidate" activeClassName="nav-active">
          <i class="fas fa-landmark"></i> Add Candidate
          </NavLink>
        </li>
        <li>
          <NavLink to="/Registration" activeClassName="nav-active">
            <i className="far fa-registered" /> Registration
          </NavLink>
        </li>
        <li>
          <NavLink to="/Voting" activeClassName="nav-active">
            <i className="fas fa-vote-yea" /> Voting
          </NavLink>
        </li>
        <li>
          <NavLink to="/Results" activeClassName="nav-active">
            <i className="fas fa-poll-h" /> Results
          </NavLink>
        </li>
      </ul>
      <i onClick={() => setOpen(!open)} className="fas fa-bars burger-menu"></i>
    </nav>
  );
}
