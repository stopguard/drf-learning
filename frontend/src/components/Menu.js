import React from "react";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <div>
            <Link to={'/'}>Users</Link> |
            | <Link to={'/projects/'}>Projects</Link> |
            | <Link to={'/todos/'}>ToDos</Link>
        </div>
    );
};

export default Menu;
