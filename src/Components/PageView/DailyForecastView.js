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
import { config } from "Config/config";

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
  const { TOKYO_LOCATION } = config;
  const [city, setCity] = useState(TOKYO_LOCATION.city);
  const [geo_lat, setLat] = useState(TOKYO_LOCATION.lat);
  const [geo_lon, setLon] = useState(TOKYO_LOCATION.lon);

  const onSubmit = async (values) => {
    try {
      const city = get(values, "myCity.myCity.name", "");
      const lat = get(values, "myCity.myCity.coord.lat", 0);
      const lon = get(values, "myCity.myCity.coord.lon", 0);

      setCity(city);
      setLat(lat);
      setLon(lon);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DashboardLayout fullWidth={true}>
      <CitySearchForm onSubmit={onSubmit} />
      <Container maxWidth="md" style={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            City Current Weather
          </Grid>
          <Grid item xs={6}>
            <div style={{ height: "250px", width: "100%" }}>
              <GoogleMap geo_lat={geo_lat} geo_lon={geo_lon}>
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
