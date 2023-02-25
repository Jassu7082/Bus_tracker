import "./App.css";
import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "../src/components/layout/home";
import Dlogin from "../src/components/auth/dlogin";
import Register from "../src/components/auth/register";
import Login from "../src/components/auth/login";
import  Direction  from "./components/userdata/Direction";
import Alert from "./components/layout/Alert";
import { loadUser } from "./actions/auth";
// redux
import { Provider } from "react-redux";
import Store from "./store";
import store from "./store";
import setAuthToken from "./utilies/setAuthToken";
import Driver from "./components/userdata/Driver";

export default function App() {
  useEffect(()=>{
    store.dispatch(loadUser());
  },[])
  return (
      <Provider store={Store}>
      <Router>
      
        <div>
          <Alert/>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dlogin" element={<Dlogin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/map" element={<Direction/>} />
            <Route path="/driver" element={<Driver/>} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}
