import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Navbar, NavbarBrand, NavbarToggler, Collapse, Nav, NavItem } from 'reactstrap';
import { useAuth } from './AuthContext';
import { useToasts } from 'react-toast-notifications';
import './NavBar.css'


function NavBar() {
  const { logout } = useAuth();
  const { user } = useAuth();
  const { addToast } = useToasts();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    // Call the logout function from AuthContext
    if (user) {
      try {
        logout();

        //  remove JWT from local storage
        localStorage.removeItem('token');
        addToast('Logout successful!', { appearance: 'success', autoDismiss: true });
      } catch (error) {
        addToast('Logout failed. Please try again.', { appearance: 'error', autoDismiss: true });
        console.error('Logout failed', error);
      }
    } else {
      addToast('You are not currently signed in.', { appearance: 'info', autoDismiss: true });
    }
  };
 
  return (
    <Navbar expand="md" className="navbar-style">
      <NavbarToggler onClick={toggle} />
      <Collapse isOpen={isOpen} navbar>
        <Nav className="ml-auto" navbar>
          <NavItem>
            <NavLink exact to="/" className="nav-link">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/aboutpage" className="nav-link">About</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/searchmovies" className="nav-link">Search Movies!</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/signin" className="nav-link">Sign In or Register!</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/favorites" className="nav-link">Favorite Movies!</NavLink>
          </NavItem>
          <NavItem>
            <button onClick={handleLogout} className="button-27">Logout</button>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  );
};


export default NavBar;