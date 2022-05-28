import { useState, useEffect } from "react";

interface IPosition {
  coords: ILocation;
}

interface ILocation {
  latitude: number;
  longitude: number;
}

export const useCurrentLocation = () => {
  const [location, setLocation] = useState<ILocation>();
  const [error, setError] = useState<string>("");

  const handleSuccess = (position: IPosition) => {
    const { latitude, longitude } = position.coords;
    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (error: any) => {
    setError(error.message);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  return { location, error };
};
