import React from "react";
import Skeleton from "@material-ui/lab/Skeleton";
import Typography from "@material-ui/core/Typography";

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
