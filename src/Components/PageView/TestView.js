import React from "react";

import { useCurrentLocation } from "Hooks/useCurrentLocation";
import { CurrentWeather } from "Components/Weather/CurrentWeather";

export const TestView = () => {
  const { location, error } = useCurrentLocation();

  if (location) {
    console.log(typeof location.latitude);
  }

  return (
    <div>
      <h1>HTML Geolocation API with React Hooks example</h1>
      {location ? (
        <>
          <code>
            Latitude: {location.latitude}, Longitude: {location.longitude}
          </code>
          <CurrentWeather
            lat={location.latitude.toString()}
            lon={location.longitude.toString()}
          />
        </>
      ) : (
        <p>Loading...</p>
      )}
      {error && <p>Location Error: {error}</p>}
    </div>
  );
};
