import axios from "axios";
import { GET_LOCATION,LOCATION_SUCCESS,LOCATION_FAIL } from "./types";
//getting current location
export const getData = () => async (dispatch) => {
    try {
        const res = await axios({
            method: "get",
            url: "/api/profile",
          });
      const { longitude, latitude } = res.data; // assuming the response data contains longitude and latitude properties
      localStorage.setItem("d_long", longitude);
      localStorage.setItem("d_lat", latitude);
      dispatch({
        type: GET_LOCATION,
        payload: res.data,
      });
    } catch (err) {
      // handle error
    }
  };

//driver sending location 
export const updateLocation = (longitude, latitude) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
      const body = JSON.stringify({ longitude, latitude });
  
      const res = await axios.post("/api/profile", body, config);
  
      dispatch({
        type: LOCATION_SUCCESS,
        payload: res.data,
      });
    } catch (err) {
      dispatch({
        type: LOCATION_FAIL,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  };
  

