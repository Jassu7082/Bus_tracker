import React from "react";

function Dlogin() {
  return (
    <div>
      <section className="container1">
      <h1 className="large text-primary">Driver</h1>
      <p className="lead"><i className="fas fa-user"></i> Driver's Account</p>
      <form className="form" >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
    </section>
    </div>
  );
}

export default Dlogin;
