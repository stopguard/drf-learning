import React from "react";
import {Link} from "react-router-dom";

const Menu = (props) => {
    return (
        <div>
            {props.isAuthenticated ? `${props.username} | | ` : ''}
            {props.isAuthenticated ? <button onClick={() => props.logout()}>Logout</button> : <Link to={'/login'}>Login</Link>}
            <br/>
            <Link to={'/'}>Users</Link> |
            | <Link to={'/projects/'}>Projects</Link> |
            | <Link to={'/todos/'}>ToDos</Link>
            <hr/>
        </div>
    );
};

export default Menu;
