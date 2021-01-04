import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
// import Container from "@material-ui/core/Container";
import { reduxForm, Field } from "redux-form";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CitySearchAutoComplete } from "Components/Forms/CitySearchAutoComplete";
import { DailyForecast } from "Components/Weather/DailyForcast";

const useStyles = makeStyles((theme) => ({
  searchForm: {
    display: "flex",
  },
  searchButton: {
    width: "25%",
    marginLeft: theme.spacing(1),
  },
  searchField: {
    marginBottom: "0 !important",
  },
}));

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
          {submitting ? "Searching" : "Search"}
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
