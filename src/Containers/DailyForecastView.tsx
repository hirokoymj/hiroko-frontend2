import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { reduxForm, Field, InjectedFormProps } from "redux-form";
import get from "lodash/get";
import RoomIcon from "@material-ui/icons/Room";
import Container from "@material-ui/core/Container";
import { useQuery } from "@apollo/react-hooks";
import tzlookup from "tz-lookup";
import Typography from "@material-ui/core/Typography";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CitySearchAutoComplete } from "Components/Forms/CitySearchAutoComplete";
import { DailyForecast } from "Components/Weather/DailyForcast";
import { GoogleMap } from "Components/Weather/GoogleMap";
import { config } from "Config/config";
import { CURRENT_WEATHER_BY_CITY } from "Queries/Weather";
import { CurrentWeatherInfoSkeleton } from "Components/Skeleton/WeatherSkeleton";
import {
  ICurrentWeatherByCityVars,
  ICurrentWeather,
} from "Types/api/CurrentWeather";
import { TDailyForecasetFormData } from "Types/forms";
import { WorldClock } from "Components/Clock/WorldClock";

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
    height: "56px",
    background: theme.palette.secondary.dark,
    color: theme.palette.common.white,
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
  weatherIcon: {
    marginRight: theme.spacing(1),
  },
  cityCountry: {
    fontWeight: 500,
    marginBottom: theme.spacing(2),
  },
  weatherInfo: {
    height: "auto",
  },
}));

type ICitySearchFormProps = InjectedFormProps<TDailyForecasetFormData>;

const CitySearchForm = reduxForm<TDailyForecasetFormData>({
  form: "CITY_SEARCH_FORM",
})((props: ICitySearchFormProps) => {
  const classes = useStyles();
  const { handleSubmit, submitting } = props;
  return (
    <Paper square={true} classes={{ root: classes.root }}>
      <form onSubmit={handleSubmit} className={classes.searchForm}>
        <Field
          name="myCity"
          component={CitySearchAutoComplete}
          variant="filled"
          label="Search city"
          className={classes.searchField}
          helperText="Japan and US only (ex. Tokyo, Los Angeles, Chicago)"
        />
        <Button
          type="submit"
          variant="contained"
          disabled={submitting}
          className={classes.searchButton}>
          {submitting ? "Searching" : "Search"}
        </Button>
      </form>
    </Paper>
  );
});

const CurrentWeatherInfo = ({ city }: { city: string }) => {
  const classes = useStyles();
  const { data, loading } = useQuery<
    ICurrentWeather,
    ICurrentWeatherByCityVars
  >(CURRENT_WEATHER_BY_CITY, {
    variables: {
      city,
    },
  });
  const { cityInfo, weather } =
    !loading && get(data, "currentWeatherByCity", {});

  const lat = parseFloat(get(cityInfo, "lat", 0));
  const lon = parseFloat(get(cityInfo, "lon", 0));
  const timezone = tzlookup(lat, lon);
  const formattedCityLocalTime = new Date().toLocaleString("en-US", {
    timeZone: timezone,
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  const cityLocalTime = new Date().toLocaleString("en-US", {
    timeZone: timezone,
  });
  const cityCountry = get(cityInfo, "name") + ", " + get(cityInfo, "country");
  const icon = get(weather, "icon");
  const temp = Math.ceil(get(weather, "temperature.day")) + `${"\u00b0"}C`;
  const text = `Feels like ${Math.ceil(
    get(weather, "feelsLike", 0)
  )} ${"\u00b0"}C. ${get(weather, "description")}.`;
  const humidity = `Humidity: ${get(weather, "humidity")}%`;

  return (
    <>
      {loading ? (
        <CurrentWeatherInfoSkeleton />
      ) : (
        <Paper className={classes.weatherInfo}>
          <Grid container justify="flex-start">
            <Grid item xs={7}>
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom color="secondary">
                  {formattedCityLocalTime}
                </Typography>
                <Typography
                  variant="h4"
                  gutterBottom
                  className={classes.cityCountry}>
                  {cityCountry}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <div style={{ display: "flex", marginBottom: "16px" }}>
                  <img
                    src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
                    width="50"
                    height="50"
                    alt=""
                    className={classes.weatherIcon}
                  />
                  <Typography variant="h4">{temp}</Typography>
                </div>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{text}</Typography>
                <Typography variant="body1">{humidity}</Typography>
              </Grid>
            </Grid>
            <Grid item xs={5}>
              <WorldClock localTime={cityLocalTime} />
            </Grid>
          </Grid>
        </Paper>
      )}
    </>
  );
};

export const DailyForecastView = () => {
  const { TOKYO_LOCATION } = config;
  const [city, setCity] = useState(TOKYO_LOCATION.city);
  const [geo_lat, setLat] = useState(TOKYO_LOCATION.lat);
  const [geo_lon, setLon] = useState(TOKYO_LOCATION.lon);

  const onSubmit = async (values: TDailyForecasetFormData) => {
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
    <DashboardLayout fullWidth={true} title="7 days Weather Forecast">
      <CitySearchForm onSubmit={onSubmit} />
      <Container maxWidth="md">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} sm={6}>
            <CurrentWeatherInfo city={city} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <div style={{ height: "250px", width: "100%" }}>
              <GoogleMap geo_lat={geo_lat} geo_lon={geo_lon}>
                <RoomIcon
                  color="error"
                  fontSize="large"
                  // lat={geo_lat}
                  // lng={geo_lon}
                />
              </GoogleMap>
            </div>
          </Grid>
          <Grid item xs={12} sm={10}>
            <DailyForecast city={city} />
          </Grid>
        </Grid>
      </Container>
    </DashboardLayout>
  );
};
