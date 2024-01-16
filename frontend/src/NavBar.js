import React from "react";
import { NavLink } from "react-router-dom";
import { Navbar, Nav, NavItem } from "reactstrap";
import './NavBar.css'


function NavBar() {
    return (
        <div>
            <Navbar expand="md" className="navbar-style">
                <NavLink exact to="/" className="nav-link">Home</NavLink>
                <Nav className="ml-auto" navbar>
                    <NavItem className="nav-item">
                        <NavLink to="/searchmovies" className="nav-link" activeClassName="active">Search Movies!</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/signin" className="nav-link" activeClassName="active">Sign In or Register!</NavLink>
                    </NavItem>
                    <NavItem className="nav-item">
                        <NavLink to="/favorites" className="nav-link" activeClassName="active">Favorite Movies!</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
        </div>
    );
}

export default NavBar;