import { useState, useEffect } from "react";

export const useCurrentLocationWebService = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    fetch("https://ipinfo.io/json?token=4cb10e9b3bcb4c")
      .then((res) => res.json())
      .then(
        (data) => {
          console.log(data);
        },
        (error) => {
          console.log(error);
          setError(error);
        }
      );
  }, []);
  return { location, error, locating };
};
