import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import { useNavigate } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import io from "socket.io-client";
const socket=io.connect("http://localhost:5000");

const Direction = ({ login,isAuthenticated }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if(!isAuthenticated){
      return navigate("/");
    }
  },[isAuthenticated]);
  const [duration, setDuration] = useState(0);
  const [route, setRoute] = useState(null);
  const u_long = localStorage.getItem("u_long");
  const u_lat = localStorage.getItem("u_lat");
  // const d_long = localStorage.getItem("d_long");
  // const d_lat = localStorage.getItem("d_lat");
  const d_long = "72.7571";
  const d_lat = "21.1452";
  let durationm = Math.floor(duration / 60);
  useEffect(() => {
    let previousPosition;
  
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    };
  
    const showPosition = (position) => {
      if (!previousPosition || (position.coords.longitude !== previousPosition.coords.longitude || position.coords.latitude !== previousPosition.coords.latitude)) {
        localStorage.setItem("u_long", position.coords.longitude);
        localStorage.setItem("u_lat", position.coords.latitude);
        previousPosition = position;
      }
    };
  
    const intervalId = setInterval(getLocation, 100);
  
    return () => clearInterval(intervalId);
  }, []);
  
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoidTIxY3MwODEiLCJhIjoiY2xjcTFqamc3MDFsYjNvbWt2NzIwcDhldiJ9.eOKzvN9IbCDTewJmXzfIPg";
    fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${u_long},${u_lat};${d_long},${d_lat}?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=${mapboxgl.accessToken}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRoute(data.routes[0]);
      })
      .catch((error) => {
        console.error(error);
      });

  }, [u_lat, u_long, d_lat, d_long]);

  useEffect(() => {
    if (!route) {
      return;
    }

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [u_long, u_lat],
      zoom: 16,
      attributionControl: false
    });

    map.on("load", async () => {
      const directions = await (
        await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${u_long},${u_lat};${d_long},${d_lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
        )
      ).json();

      setDuration(directions.routes[0].duration);
      map.addLayer({
        id: "route",
        type: "line",
        source: {
          type: "geojson",
          data: route.geometry
        },
        paint: {
          "line-color": "#ff0000",
          "line-width": 4
        }
      });

            var bounds = new mapboxgl.LngLatBounds();
      bounds.extend([u_long, u_lat]);
      bounds.extend([d_long, d_lat]);

      map.fitBounds(bounds, {
        padding: { top: 50, bottom: 50, left: 50, right: 50 },
        maxZoom: 14
      });

      setInterval(function() {
        map.jumpTo({
          center: [u_long, u_lat],
          zoom: 17,
          bearing: 0,
          pitch: 0
        });
      }, 7000);
      


    });

    return () => map.remove();
  }, [route, u_lat, u_long, d_lat, d_long]);

  return (
    <div className="map">
      {route ? (
        <div id="map" style={{ height: "400px", width: "100%" }} />
      ) : (
        <p>Loading route information...</p>
      )}
      <div className="duration">
        <p>Duration: {durationm} minutes</p>
      </div>
    </div>
  );
};
Direction.propTypes={
  login: PropTypes.func.isRequired,
  isAuthenticated : PropTypes.bool
};

const mapStateToProps = state=>({
  isAuthenticated:state.auth.isAuthenticated
});


export default connect(mapStateToProps,{login})(Direction);
