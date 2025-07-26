import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ lat, lng, address }) => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  };

  const hasValidPosition = typeof lat === 'number' && typeof lng === 'number';
  const position = hasValidPosition ? [lat, lng] : null;

  if (!position) {
    return (
      <div style={mapContainerStyle} className="d-flex justify-content-center align-items-center">
        <p>Location not available for this ground.</p>
      </div>
    );
  }

  return (
    <MapContainer center={position} zoom={15} style={mapContainerStyle}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>{address || 'Ground Location'}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
