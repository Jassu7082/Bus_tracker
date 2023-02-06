import {applyMiddleware} from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { configureStore } from "@reduxjs/toolkit";


const initialState ={};
const middleware =[thunk];

const store = configureStore({
    reducer: rootReducer,
    middleware: [...middleware],
    devTools: process.env.NODE_ENV !== 'production' && composeWithDevTools(applyMiddleware(...middleware)),
    });

export default store;