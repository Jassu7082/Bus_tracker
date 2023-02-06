import axios from "axios";
import { REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR } from "./types";
import { LOGIN_FAIL,LOGIN_SUCCESS } from "./types";
import setAuthToken from "../utilies/setAuthToken"
import { setAlert } from "./alert";

//load user
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res =await axios.get("http://localhost:5000/api/auth");
        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err){
        dispatch({
            type:AUTH_ERROR
        })
    }
}

// Register User
export const register =({name,email,phone,password})=>async dispatch=>{
    const config={
        headers:{
            "Content-Type":"application/json"
        }
    }
    const body =JSON.stringify({name,email,phone,password});

    try{
        const res = await axios.post("http://localhost:5000/api/users",config,body);
        
        dispatch({
            type:REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());
    } catch(err){
        const errors= err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")));        
        }
        dispatch({
            type:REGISTER_FAIL
        });
    }

}

// Login User
export const login =(email,password)=>async dispatch=>{
    // const config={
    //     headers:{
    //         "Content-Type":"application/json"
    //     }
    // }
    // const body =JSON.stringify({email,password});

    try{
        const res = await axios({
            method: "post",
            url:"http://localhost:5000/api/auth",
            data:{email,password}
        });
        
        dispatch({
            type:LOGIN_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());
    } catch(err){
        const errors= err.response.data.errors;
        if(errors){
            errors.forEach(error => dispatch(setAlert(error.msg,"danger")));        
        }
        dispatch({
            type:LOGIN_FAIL
        });
    }

}

