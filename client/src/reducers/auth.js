import { REGISTER_SUCCESS,REGISTER_FAIL,
    USER_LOADED,AUTH_ERROR ,
    LOGIN_FAIL,LOGIN_SUCCESS,LOGOUT, DLOGIN_SUCCESS, DLOGIN_FAIL} from "../actions/types";

const initialState={
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading:true,
    user:null
};

export default function(state=initialState,action){
    const {type,payload}= action;

    switch(type){
        case USER_LOADED:
            return{
               ...state,
               isAuthenticated:true,
               isDAuthenticated: false,
               loading:false,
               user:payload 
            };
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem("token",payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                isDAuthenticated: false,
                loading: false
            };
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT:
            localStorage.removeItem("token");
            return{
                ...state,
                isAuthenticated: false,
                isDAuthenticated: false,
                loading: false
            };
        
        case DLOGIN_SUCCESS:
            localStorage.setItem("token",payload.token);
            return{
                ...state,
                ...payload,
                isDAuthenticated: true,
                loading: false
            };
        case DLOGIN_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                isDAuthenticated: false,
                loading: false
            };
        default:
            return state;

    }
};