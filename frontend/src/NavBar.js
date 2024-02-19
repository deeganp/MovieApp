import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import { useAuth } from './AuthContext';
import { useToasts } from 'react-toast-notifications';
import './NavBar.css'


function NavBar() {
    const { logout } = useAuth();
    const {user} = useAuth();
    const { addToast } = useToasts();

    const handleLogout = () => {
        // Call the logout function from AuthContext
        if (user){
        try {
            logout();

            //  remove JWT from local storage
            localStorage.removeItem('token');
            addToast('Logout successful!', { appearance: 'success', autoDismiss: true });
        } catch (error) {
            addToast('Logout failed. Please try again.', { appearance: 'error', autoDismiss: true });
            console.error('Logout failed', error);
        }
      } else{
        addToast('You are not currently signed in.', { appearance: 'info', autoDismiss: true });
      }
    };
    return (
        <div>
            <Navbar expand="md" className="navbar-style">
                <NavLink exact to="/" className="nav-link">Home</NavLink>
                <Nav className="ml-auto" navbar>
                    <NavItem className="nav-item">
                        <NavLink to="/aboutpage" className="nav-link" activeClassName="active">About</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/searchmovies" className="nav-link" activeClassName="active">Search Movies!</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/signin" className="nav-link" activeClassName="active">Sign In or Register!</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/favorites" className="nav-link" activeClassName="active">Favorite Movies!</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <button onClick={handleLogout} className="nav-link" >Logout</button>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;