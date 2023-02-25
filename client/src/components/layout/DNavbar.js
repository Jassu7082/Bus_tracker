import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";


function Navbar({auth:{isDAuthenticated,loading},logout}) {
    const guestLinks=(
        <ul>
                <li>
                  <Link to="/dlogin">Driver </Link>
                </li>
                <li>
                  <Link to="/register">Register </Link>
                </li>
                <li>
                  <Link to="/login">Login </Link>
                </li>
              </ul>
      );
  const dLinks=(
    <ul>
            <li>
              <Link to="/driver">Driver </Link>
            </li>
            <li>
                <a onClick={logout} href="#!">
                <i className="fas fa-sign-out-alt"></i>{''}
                <span className="hide-sm">Logout</span></a>
            </li>
    </ul>
  );
  return (
    <nav className="navbar bg-dark">
          <h1>
            <Link to="/">
              <i className="fas fa-code"></i>Track Bus
            </Link>
          </h1>
          { !loading && 
        <Fragment>
           {dLinks}
        </Fragment>
      }
        </nav>
  );
};

Navbar.propTypes={
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}
const mapStateToProps =state =>({
  auth:state.auth
})

export default connect(mapStateToProps,{logout})(Navbar);
