import React, { useState } from "react";
import { Link,redirect} from "react-router-dom";
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import { register} from "../../actions/auth";
import PropTypes from "prop-types";
function Register({setAlert,register,isAuthenticated}) {
  const [formData,setFormData]=useState(
    {
      name:"",
      email:"",
      phone:"",
      password:"",
      password2:""
    }
  );
    const {name,email,phone,password,password2}= formData;
    const onChange = e => setFormData({...formData,[e.target.name]:e.target.value});
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const onSubmit =async e =>{
      e.preventDefault();
      if(password!==password2){
        setAlert("password didnt match","danger");
      } else{
        register({name,email,phone,password});
      }
    };
    if(isAuthenticated){
      return redirect("/map");
    }
    return (
    <div>
       <section className="container1">
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input type="text" placeholder="Name" name="name" value={name} onChange={e=> onChange(e)} required />
        </div>
        <div className="form-group">
          <input type="email" placeholder="Email Address" name="email" value={email} onChange={e=> onChange(e)} required />
          <small className="form-text"
            >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
          >
        </div>
        <div className="form-group">
        <small className="form-text"
            >+91</small
          >
          <input type="text" pattern="\d{10}" placeholder="Phone Number" name="phone" value={phone} onChange={e=> onChange(e)} required/>
          <small className="form-text"
            >used in later updates</small
          >
        </div>
        <div className="form-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="password"
            minLength="8"
            value={password} onChange={e=> onChange(e)} required
          />
          <input type="checkbox" onClick={() => setShowPassword(!showPassword)} />
        </div>
        <div className="form-group">
          <input
          
            type={showPassword1 ? "text" : "password"}
            placeholder="Confirm Password"
            name="password2"
            minLength="8"
            value={password2} onChange={e=> onChange(e)} required
          />
      <input type="checkbox" onClick={() => setShowPassword1(!showPassword1)} />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </section>
    </div>
  );
}
Register.propTypes={
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};
const mapStateToProps = state=>({
  isAuthenticated:state.auth.isAuthenticated
});
export default connect(mapStateToProps,{setAlert,register})(Register);
