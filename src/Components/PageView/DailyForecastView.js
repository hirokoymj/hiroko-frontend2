import React from "react";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";
import map from "lodash/map";
import moment from "moment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";

import { DAILY_FORECAST } from "Queries/Weather";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { DailyForecastSkelton } from "Components/Skelton/WeatherSkelton";

const useStyles = makeStyles((theme) => ({
  forecastDate: {
    width: "25%",
    textAlign: "left",
  },
  weather: {
    width: "25%",
    textAlign: "center",
  },
  tempHigh: {
    width: "25%",
    textAlign: "center",
    color: red[500],
  },
  tempLow: {
    width: "25%",
    textAlign: "center",
    color: blue[700],
  },
}));

export const DailyForecast = ({ city, unit }) => {
  const classes = useStyles();
  const { data, loading } = useQuery(DAILY_FORECAST, {
    variables: {
      city,
      unit,
    },
  });
  const { city: cityInfo, forecastList } =
    !loading && get(data, "dailyForecast", {});

  const cityName = get(cityInfo, "name", "");
  const country = get(cityInfo, "country", "");

  const mappedData = map(forecastList, (forecast) => {
    const {
      dt,
      weather,
      icon,
      humidity,
      temperature: { day, min, max },
    } = forecast;
    return {
      dt,
      weather,
      icon,
      humidity,
      day,
      min,
      max,
    };
  });
  const unit_format = unit === "imperial" ? "F" : "C";
  const mappedDataLen = mappedData.length;

  return (
    <>
      {loading ? (
        <DailyForecastSkelton />
      ) : (
        <>
          <Typography component="h2" variant="h3" gutterBottom>
            {cityName},{country}
          </Typography>
          <Paper>
            <List>
              <ListItem dense divider>
                <ListItemText primary="Date" className={classes.forecastDate} />
                <ListItemText primary="Weather" className={classes.weather} />
                <ListItemText primary="High" className={classes.tempHigh} />
                <ListItemText primary="Low" className={classes.tempLow} />
              </ListItem>
              {mappedData.map(({ dt, weather, icon, day, min, max }, index) => {
                return (
                  <ListItem
                    divider={index !== mappedDataLen - 1 ? true : false}
                    dense
                  >
                    <ListItemText
                      primary={moment.unix(dt).format("ddd, MM/DD")}
                      className={classes.forecastDate}
                    />
                    <ListItemText className={classes.weather}>
                      <img
                        src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                        width="50"
                        height="50"
                        alt={weather}
                      />
                      <Typography variant="body1">{weather}</Typography>
                    </ListItemText>
                    <ListItemText className={classes.tempHigh}>
                      {Math.ceil(max)}&deg;{unit_format}
                    </ListItemText>
                    <ListItemText className={classes.tempLow}>
                      {Math.ceil(min)}&deg;{unit_format}
                    </ListItemText>
                  </ListItem>
                );
              })}
            </List>
          </Paper>
        </>
      )}
    </>
  );
};

export const DailyForecastView = () => {
  return (
    <DashboardLayout maxWidth="sm">
      <DailyForecast city="tokyo" />
    </DashboardLayout>
  );
};
