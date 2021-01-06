import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { reduxForm, Field } from "redux-form";
import get from "lodash/get";
import RoomIcon from "@material-ui/icons/Room";
import Container from "@material-ui/core/Container";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CitySearchAutoComplete } from "Components/Forms/CitySearchAutoComplete";
import { DailyForecast } from "Components/Weather/DailyForcast";
import { GoogleMap } from "Components/Weather/GoogleMap";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    display: "flex",
    flexDirection: "row",
    width: "45%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  searchButton: {
    width: "20%",
    borderRadius: 0,
  },
  searchField: {
    marginBottom: "0 !important",
    borderRadius: "0 !important",
  },
  root: {
    boxShadow: "none",
    padding: "32px !important",
    marginBottom: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      padding: "16px !important",
    },
  },
}));

const CitySearchForm = reduxForm({
  form: "CITY_SEARCH_FORM",
})(({ handleSubmit, submitting }) => {
  const classes = useStyles();

  return (
    <Paper square={true} classes={{ root: classes.root }}>
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
          {submitting ? "Searching" : "Search"}
        </Button>
      </form>
    </Paper>
  );
});

export const DailyForecastView = () => {
  // const defaultCity = {
  //   city: "tokyo",
  //   lat: 35.689499,
  //   lng: 139.691711,
  // };
  const [city, setCity] = useState("tokyo");
  const [lat, setLat] = useState(35.689499); // Tokyo is default latitude
  const [lng, setLng] = useState(139.691711); // Tokyo is default longitude

  // ----- TOKYO
  // lon(pin):139.691711
  // lat(pin):35.689499
  // ----- Los Angeles
  // lon(pin):-118.243683
  // lat(pin):34.052231

  const onSubmit = async (values) => {
    try {
      console.log("onSubmit");
      console.log(values);
      const city_name = get(values, "myCity.myCity.name", "");
      const city_lat = get(values, "myCity.myCity.coord.lat");
      const city_lon = get(values, "myCity.myCity.coord.lon");
      setCity(city_name);
      setLat(city_lat);
      setLng(city_lon);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DashboardLayout fullWidth={true}>
      <CitySearchForm onSubmit={onSubmit} />
      <Container maxWidth="sm" style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            City Current Weather
          </Grid>
          <Grid item xs={8}>
            <div style={{ height: "250px", width: "100%" }}>
              <GoogleMap lat={lat} lng={lng}>
                <RoomIcon color="error" fontSize="large" />
              </GoogleMap>
            </div>
          </Grid>
          <Grid item xs={11} sm={12}>
            <DailyForecast city={city} />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};
