import axios from "axios";
import { REGISTER_FAIL,REGISTER_SUCCESS,USER_LOADED,AUTH_ERROR } from "./types";
import { LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT } from "./types";
import setAuthToken from "../utilies/setAuthToken"
import { setAlert } from "./alert";

//load user
export const loadUser=()=>async dispatch=>{
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }
    try{
        const res =await axios.get("/api/auth");
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
    try{
        const res = await axios({
            method: "post",
            url:"/api/users",
            data:{name,email,phone,password}
        });
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
            url:"/api/auth",
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

// Logout

export const logout=()=> dispatch=>{
    dispatch({type:LOGOUT});
}