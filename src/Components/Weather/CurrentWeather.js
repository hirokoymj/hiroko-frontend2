import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import { makeStyles } from "@material-ui/core/styles";

import { CURRENT_WEATHER_BY_CITY } from "Queries/Weather";
import { CurrentWeatherSkeleton } from "Components/Skeleton/WeatherSkeleton";

const useStyles = makeStyles((theme) => ({
  row: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.common.white,
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

export const CurrentWeather = ({ city, unit }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(CURRENT_WEATHER_BY_CITY, {
    variables: {
      city,
      unit,
    },
  });
  const { weather } = !loading && get(data, "currentWeatherByCity", {});
  const temp_day = Math.ceil(get(weather, "temperature.day", 0));
  const temp_unit = unit === "imperial" ? "F" : "C";
  const icon = get(weather, "icon");
  const condition = get(weather, "condition");

  return (
    <>
      {loading ? (
        <CurrentWeatherSkeleton />
      ) : (
        <div className={classes.weatherInfo}>
          <div className={classes.row}>
            {icon && (
              <img
                src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                width="50"
                height="50"
                alt={condition}
              />
            )}
            <span>
              {temp_day}&deg;
              {temp_unit}
            </span>
          </div>
          <div className={classes.row} style={{ marginTop: "-10px" }}>
            {city.toUpperCase()}
          </div>
        </div>
      )}
    </>
  );
};
