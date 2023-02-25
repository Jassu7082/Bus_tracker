import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { updateLocation } from "../../actions/location";
import DNavbar from "../layout/DNavbar";
import { useDispatch } from "react-redux";

function Driver() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const dispatch = useDispatch(); // Move the declaration of `dispatch` here.

  useEffect(() => {
    if (!token) {
      navigate("/");
    }
  }, [token]);

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (updating) {
      let previousPosition;
  
      const getLocation = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
        }
      };
  
      const showPosition = (position) => {
        if (
          !previousPosition ||
          (position.coords.longitude !== previousPosition.coords.longitude ||
            position.coords.latitude !== previousPosition.coords.latitude)
        ) {
          localStorage.setItem("d_long", position.coords.longitude);
          localStorage.setItem("d_lat", position.coords.latitude);
          setLongitude(position.coords.longitude);
          setLatitude(position.coords.latitude);
          previousPosition = position;
        }
      };
  
      const intervalId = setInterval(() => {
        if (updating) {
          dispatch(updateLocation(longitude, latitude));
        }
        getLocation();
      }, 100);
  
      return () => clearInterval(intervalId);
    }
  }, [dispatch, longitude, latitude, updating]);
  

  const handleUpdateLocation = () => {
    setUpdating(true);
    dispatch(updateLocation(longitude, latitude));
  };

  const handleStopUpdate = () => {
    setUpdating(false);
  };

  return (
    <Fragment>
      <DNavbar />
      <div>
        <h1>driver page</h1>
        <div>
          {!updating && (
            <button onClick={handleUpdateLocation}>Update Location</button>
          )}
          {updating && (
            <button onClick={handleStopUpdate}>Stop</button>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Driver;
