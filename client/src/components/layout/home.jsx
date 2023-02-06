import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
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
  );
}

export default Home;
