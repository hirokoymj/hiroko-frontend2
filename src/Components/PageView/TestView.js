import React from "react";

// import { useCurrentLocation } from "Hooks/useCurrentLocation";
// import { CurrentWeather } from "Components/Weather/CurrentWeather";
import { CitySearchAutoComplete } from "Components/Forms/CitySearchAutoComplete";

export const TestView = () => {
  return (
    <div>
      <h1>HTML Geolocation API with React Hooks example</h1>
      <CitySearchAutoComplete />
    </div>
  );
};
