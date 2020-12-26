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

import { DAILY_FORECAST } from "Queries/Weather";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

export const DailyForecast = ({ city, unit }) => {
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

  console.log(cityName);

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

  return (
    <>
      <Typography component="h2" variant="h3" gutterBottom>
        {cityName},{country}
      </Typography>
      <Paper>
        <List>
          <ListItem dense divider>
            <ListItemText primary="Date" />
            <ListItemText primary="Weather" />
            <ListItemText primary="High" />
            <ListItemText primary="Low" />
          </ListItem>
          {mappedData.map(({ dt, weather, icon, day, min, max }) => {
            console.log(moment(dt));
            return (
              <ListItem divider dense>
                <ListItemText primary={moment.unix(dt).format("ddd, MM/DD")} />
                <ListItemText>
                  <img
                    src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
                    width="50"
                    height="50"
                    alt={weather}
                  />
                  <Typography variant="body1">{weather}</Typography>
                </ListItemText>
                <ListItemText>
                  {Math.ceil(max)}&deg;{unit_format}
                </ListItemText>
                <ListItemText>
                  {Math.ceil(min)}&deg;{unit_format}
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </Paper>
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
