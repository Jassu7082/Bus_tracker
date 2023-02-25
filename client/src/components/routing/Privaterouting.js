import React from "react";
import PropTypes from "prop-types";
import { Route,useNavigate } from "react-router-dom";
import { connect} from "react-redux";

const PrivateRoute=({component:Component,auth:{isAuthenticated,loading},...rest})=>{
    const navigate = useNavigate();
    <Route {...rest} render={props=>!isAuthenticated && !loading ?navigate("/login"):(<Component {...props}/>)} />

}

PrivateRoute.prototype={
    auth:PropTypes.object.isRequired
}

const mapStateToProps= state =>({
    auth:state.auth
});

export default connect(mapStateToProps)(PrivateRoute);