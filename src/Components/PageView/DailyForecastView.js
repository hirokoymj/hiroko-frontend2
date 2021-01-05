import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { reduxForm, Field } from "redux-form";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CitySearchAutoComplete } from "Components/Forms/CitySearchAutoComplete";
import { DailyForecast } from "Components/Weather/DailyForcast";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    display: "flex",
    flexDirection: "row",
    width: "45%",
    margin: "auto",
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
  const [city, setCity] = useState("tokyo");

  const onSubmit = (values) => {
    setCity(values.myCity);
  };

  return (
    <DashboardLayout fullWidth={true}>
      <CitySearchForm onSubmit={onSubmit} />
      <Grid container justify="center">
        <Grid item xs={6}>
          <DailyForecast city={city} />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
