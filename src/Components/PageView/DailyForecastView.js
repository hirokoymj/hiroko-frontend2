import React, { useState } from "react";
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
// import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
// import Container from "@material-ui/core/Container";
import { reduxForm, Field } from "redux-form";
// import { compose } from "recompose";

import { DAILY_FORECAST } from "Queries/Weather";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { DailyForecastSkelton } from "Components/Skelton/WeatherSkelton";
import { CitySearchAutoComplete } from "Components/Forms/CitySearchAutoComplete";

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
    width: "20%",
    textAlign: "center",
    color: red[500],
  },
  tempLow: {
    width: "20%",
    textAlign: "center",
    color: blue[700],
  },
  rain: {
    width: "20%",
    textAlign: "center",
  },
  root: {
    justifyContent: "center",
  },
  searchForm: {
    display: "flex",
  },
  searchButton: {
    width: "25%",
  },
  searchField: {
    width: "80%",
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
  const { cityInfo, forecastList } = !loading && get(data, "dailyForecast", {});

  const cityName = get(cityInfo, "name", "");
  const country = get(cityInfo, "country", "");
  const mappedData = map(forecastList, (forecast) => {
    const {
      dt,
      condition,
      icon,
      temperature: { min, max },
      rain,
    } = forecast;

    return {
      dt,
      condition,
      icon,
      min,
      max,
      rain,
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
                <ListItemText primary="Rain" className={classes.rain} />
              </ListItem>
              {mappedData.map(
                ({ dt, condition, icon, min, max, rain }, index) => {
                  return (
                    <ListItem
                      divider={index !== mappedDataLen - 1 ? true : false}
                      dense
                      key={dt}
                    >
                      <ListItemText
                        primary={moment.unix(dt).format("ddd, MM/DD")}
                        className={classes.forecastDate}
                      />
                      <ListItemText className={classes.weather}>
                        {icon && (
                          <img
                            src={`http://openweathermap.org/img/wn/${icon}@2x.png`}
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
                    </ListItem>
                  );
                }
              )}
            </List>
          </Paper>
        </>
      )}
    </>
  );
};

const CitySearchForm = reduxForm({
  form: "CITY_SEARCH_FORM",
})(({ handleSubmit, submitting }) => {
  const classes = useStyles();

  return (
    <Paper>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <Field
          name="myCity"
          component={CitySearchAutoComplete}
          variant="filled"
          label="Search city"
          className={classes.searchField}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={submitting}
          className={classes.searchButton}
        >
          {submitting ? "Submitting" : "Submit"}
        </Button>
      </form>
    </Paper>
  );
});

export const DailyForecastView = () => {
  // const classes = useStyles();
  const [city, setCity] = useState("tokyo");

  const onSubmit = (values) => {
    setCity(values.myCity);
  };

  return (
    <DashboardLayout maxWidth="sm">
      <CitySearchForm onSubmit={onSubmit} />
      <br />
      <br />
      <br />
      <DailyForecast city={city} />
    </DashboardLayout>
  );
};
