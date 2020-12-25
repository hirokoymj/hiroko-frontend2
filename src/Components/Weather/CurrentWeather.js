import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";

import { CURRENT_WEATHER } from "Queries/Weather";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "100%",
    flex: 1,
  },
  weatherInfo: {
    fontSize: "1rem",
    fontFamily: ["Titillium Web", "sans-serif"].join(","),
    fontWeight: 700,
    padding: theme.spacing(0, 2),
    borderLeft: "1px solid #4C6786",
    borderRight: "1px solid #4C6786",
  },
}));

export const CurrentWeather = ({ lat, lon, unit = "metric" }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(CURRENT_WEATHER, {
    variables: {
      lat,
      lon,
      unit,
    },
  });
  console.log(data);

  const { cityName, temperature, icon, weather } =
    !loading && get(data, "currentWeather", {});
  const currentTemperature = Math.ceil(temperature);
  const currentTemperatureUnit = unit === "metric" ? "C" : "F";
  return (
    <>
      {loading ? (
        "loading"
      ) : (
        <div className={classes.weatherInfo}>
          <div className={classes.row}>
            <img
              src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
              width="50"
              height="50"
              alt={weather}
            />
            <span>
              {currentTemperature}&deg;
              {currentTemperatureUnit}
            </span>
          </div>
          <div className={classes.row} style={{ marginTop: "-10px" }}>
            {cityName}
          </div>
        </div>
      )}
    </>
  );
};
