import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

import { logout } from "../../actions/auth";


function UserNavbar() {

  return (
    <nav className="navbar bg-dark">
          <h1>
            <Link to="/">
              <i className="fas fa-code"></i>Track Bus
            </Link>
          </h1>
          <ul>
      <li>
          <Link to="/map">Directions </Link>
      </li>
      <li>

      </li>
      <li>
        <a onClick={logout} href="#!">
        <i className="fas fa-sign-out-alt"></i>{''}
        <span className="hide-sm">Logout</span></a>
      </li>
    </ul>
        </nav>
  );
};



export default UserNavbar;
