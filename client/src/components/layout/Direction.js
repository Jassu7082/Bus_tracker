import React, { useState, useEffect } from "react";
import mapboxgl from "mapbox-gl";

const Direction = () => {
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
    mapboxgl.accessToken =
      "pk.eyJ1IjoidTIxY3MwODEiLCJhIjoiY2xjcTFqamc3MDFsYjNvbWt2NzIwcDhldiJ9.eOKzvN9IbCDTewJmXzfIPg";
    fetch(
      "https://api.mapbox.com/directions/v5/mapbox/driving/" +
        u_long +
        "%2C" +
        u_lat +
        "%3B" +
        d_long +
        "%2C" +
        d_lat +
        "?alternatives=true&geometries=geojson&language=en&overview=full&steps=true&access_token=pk.eyJ1IjoidTIxY3MwODEiLCJhIjoiY2xjcTFqamc3MDFsYjNvbWt2NzIwcDhldiJ9.eOKzvN9IbCDTewJmXzfIPg"
    )
      .then((response) => response.json())
      .then((data) => {
        setRoute(data.routes[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [u_lat, u_long]);

  useEffect(() => {
    if (!route) {
      return;
    }
    const calculateDuration = () => {};

    calculateDuration();

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/streets-v11",
      center: [u_long, u_lat],
      zoom: 16
    });
    function addPinpoint(lng, lat, color) {
      new mapboxgl.Marker({
        color: color
      })
        .setLngLat([lng, lat])
        .addTo(map);
    }

    addPinpoint(u_long, u_lat, "red");
    addPinpoint(d_long, d_lat, "red");
    map.on("load", async () => {
      const directions = await (
        await fetch(
          `https://api.mapbox.com/directions/v5/mapbox/driving/${u_long},${u_lat};${d_long},${d_lat}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`
        )
      ).json();

      setDuration(directions.routes[0].duration);
    });
    map.on("load", () => {
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
    });
  }, [u_long, u_lat, route]);

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

export default Direction;
