import React, { useRef, useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Map(props) {
  const mapRef = useRef(null);

  useEffect(() => {
    let map;

    if (!mapRef.current) return;

    // Check if map is already initialized on the element
    if (mapRef.current.classList.contains("leaflet-container")) {
      // Remove the existing map instance
      mapRef.current._leaflet_id = null;
      mapRef.current.innerHTML = "";
    }

    // Create new map instance
    map = L.map(mapRef.current).setView(props.center, props.zoom);

    // Add tile layer
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data © OpenStreetMap contributors",
    }).addTo(map);

    // Add markers for each temple
    props.temples.forEach((temple) => {
      const marker = L.marker(temple.location).addTo(map);
      marker.bindPopup(`<b>${temple.name}</b><br>${temple.address}`).openPopup();
    });

    return () => {
      map.remove();
    };
  }, [props.center, props.zoom, props.temples]);

  return <div className="map" ref={mapRef} />;
}

export default Map;
