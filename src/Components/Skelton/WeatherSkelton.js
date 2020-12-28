import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: 119,
    "& span": {
      backgroundColor: "rgb(76, 103, 134) !important",
    },
  },
});

export const DailyForecastSkelton = () => {
  return (
    <>
      <Skeleton component="div" width="100%">
        <Typography component="h2" variant="h1">
          .
        </Typography>
      </Skeleton>
      <Skeleton variant="rect" component="div" width="100%" height="450px" />
    </>
  );
};

export const CurrentWeatherSkelton = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Skeleton variant="text" height={45} />
      <Skeleton variant="text" height={20} />
    </div>
  );
};
