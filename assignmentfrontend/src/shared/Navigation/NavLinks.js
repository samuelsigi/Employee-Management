import React,{ useContext } from "react";
import './NavLinks.css';
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";


const NavLinks= props =>{

    const auth = useContext(AuthContext);

    return(<ul className="nav-links">
        <li>
            <NavLink to="/" exact="true">All Departments</NavLink>
        </li>

        {auth.isLoggedIn &&
        <li>
            <NavLink to="/employee/new" exact="true">Add Employee</NavLink>
        </li>}

        {!auth.isLoggedIn &&
        <li>
            <NavLink to="/auth" exact="true">Authenticate</NavLink>
        </li>}
        
        {auth.isLoggedIn &&
        <li>
            <NavLink onClick={auth.logout} exact="true">Log Out</NavLink>
        </li>}

    </ul>
    )
}

export default NavLinks;