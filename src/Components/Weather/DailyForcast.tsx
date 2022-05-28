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
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

import { DAILY_FORECAST } from "Queries/Weather";
import { DailyForecastSkeleton } from "Components/Skeleton/WeatherSkeleton";
import { IDailyForecast, IDailyForcastVars } from "Types/api/DailyForcast";

const useStyles = makeStyles((theme) => ({
  forecastDate: {
    width: "20%",
    textAlign: "left",
  },
  weather: {
    width: "20%",
    textAlign: "center",
  },
  tempHigh: {
    width: "10%",
    textAlign: "center",
    color: red[500],
  },
  tempLow: {
    width: "10%",
    textAlign: "center",
    color: blue[700],
  },
  rain: {
    width: "10%",
    textAlign: "center",
  },
  humidity: {
    width: "15%",
    textAlign: "center",
  },
  root: {
    justifyContent: "center",
  },
}));

export const DailyForecast = (props: IDailyForcastVars) => {
  const classes = useStyles();
  const { city, unit } = props;
  const { data, loading } = useQuery<IDailyForecast, IDailyForcastVars>(
    DAILY_FORECAST,
    {
      variables: {
        city,
        unit,
      },
    }
  );
  const { forecastList } = !loading && get(data, "dailyForecast", {});

  const mappedData = map(forecastList, (forecast) => {
    const {
      dt,
      condition,
      icon,
      temperature: { min, max },
      rain,
      humidity,
    } = forecast;

    return {
      dt,
      condition,
      icon,
      min,
      max,
      rain,
      humidity,
    };
  });
  const unit_format = unit === "imperial" ? "F" : "C";
  const mappedDataLen = mappedData.length;

  return (
    <>
      {loading ? (
        <DailyForecastSkeleton />
      ) : (
        <div>
          <Grid container alignItems="baseline">
            <Grid item xs={6}>
              {" "}
              <Typography component="h2" variant="h5" gutterBottom>
                7 days forecast
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              justifyContent="flex-end"
              style={{ display: "flex" }}>
              <Typography variant="body1" component="span" gutterBottom>
                Source:{" "}
              </Typography>
              <Link
                href="https://openweathermap.org/api"
                variant="body1"
                target="_blank"
                rel="noreferrer">
                OpenWeather
              </Link>
            </Grid>
          </Grid>
          <Paper>
            <List>
              <ListItem dense divider>
                <ListItemText primary="Date" className={classes.forecastDate} />
                <ListItemText primary="Weather" className={classes.weather} />
                <ListItemText primary="High" className={classes.tempHigh} />
                <ListItemText primary="Low" className={classes.tempLow} />
                <ListItemText primary="Rain" className={classes.rain} />
                <ListItemText primary="Humidity" className={classes.humidity} />
              </ListItem>
              {mappedData.map(
                ({ dt, condition, icon, min, max, rain, humidity }, index) => {
                  return (
                    <ListItem
                      divider={index !== mappedDataLen - 1 ? true : false}
                      dense
                      key={dt}>
                      <ListItemText
                        primary={moment.unix(dt).format("ddd, MM/DD")}
                        className={classes.forecastDate}
                      />
                      <ListItemText className={classes.weather}>
                        {icon && (
                          <img
                            src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                            width="50"
                            height="50"
                            alt={condition}
                          />
                        )}
                        <Typography variant="body1">{condition}</Typography>
                      </ListItemText>
                      <ListItemText className={classes.tempHigh}>
                        {Math.ceil(max)}&deg;{unit_format}
                      </ListItemText>
                      <ListItemText className={classes.tempLow}>
                        {Math.ceil(min)}&deg;{unit_format}
                      </ListItemText>
                      <ListItemText className={classes.rain}>
                        {Math.ceil(rain)}&#37;
                      </ListItemText>
                      <ListItemText className={classes.humidity}>
                        {humidity} %
                      </ListItemText>
                    </ListItem>
                  );
                }
              )}
            </List>
          </Paper>
        </div>
      )}
    </>
  );
};
