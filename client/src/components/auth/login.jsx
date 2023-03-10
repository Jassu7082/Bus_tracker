import React, { useEffect, useState } from "react";
import { Link,redirect, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

function Login({login,isAuthenticated}) {
  const navigate = useNavigate();
  useEffect(() => {
    if(isAuthenticated){
      return navigate("/map");
    }
  },[isAuthenticated]);

  const [formData,setFormData]=useState(
    {
      email:"",
      password:""
    }
  );
  const {email,password}= formData;
  const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    console.log(formData);
    const onSubmit = async e =>{
      e.preventDefault();
      login(email,password);
    };

    // //redirect 
    // if(isAuthenticated){
    //   const navigate = useNavigate();
    //   return navigate("/map");
    // }
   
  return (
    <div>
      <section className="container1">
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i className="fas fa-user"></i> Sign into Your Account</p>
      <form className="form" >
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email} onChange={e=> onChange(e)} 
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value={password} onChange={e=> onChange(e)} required
          />
        </div>
        <input onClick={e=>onSubmit(e)} className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </section>
    </div>
  );
};
Login.propTypes={
  login: PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
};
const mapStateToProps = state=>({
  isAuthenticated:state.auth.isAuthenticated
});

export default connect(mapStateToProps,{login})(Login);
