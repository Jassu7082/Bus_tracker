import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

function Home() {
  return (
    <Fragment>
    <Navbar/>
    <div>
      <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <h1 className="x-large"> Connector</h1>
          <p className="lead">
            Create a  profile, track the bus.
          </p>
          <div class="buttons">
            <Link to="/register" className="btn btn-primary">Sign Up</Link>
            <Link to="/login" className="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
    </div>
    </Fragment>
  );
}

export default Home;
