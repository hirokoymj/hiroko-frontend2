import React from "react";
import GoogleMapReact from "google-map-react";

export const GoogleMap = ({ lat, lng, children }) => {
  console.log("GoogleMap");
  console.log(`lat: ${lat}, lng: ${lng}`);

  return (
    <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyDVSQkRDcbE-z-2aeaAtFpkQPm4l_wu43o" }}
      defaultCenter={{
        lat,
        lng,
      }}
      defaultZoom={10} // ZoomLevel: City
    >
      {children}
    </GoogleMapReact>
  );
};
