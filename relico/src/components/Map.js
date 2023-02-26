import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const Map = ({ center, zoom }) => {
    const [position, setPosition] = useState([0, 0]);
    const [map, setMap] = useState(null);


    useEffect(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position.coords.latitude)
          setPosition([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.log(error);
        }
      );
    }, []);



  return(
        <MapContainer center={position} zoom={13} whenCreated={setMap} style={{ height: "100vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position}>
                  <Popup>Your current location</Popup>
                </Marker>
          </MapContainer>
  );
};

export default Map;
