import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Link as RouterLink } from "react-router-dom";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme: Theme) => ({
  logo: {
    textDecoration: "none !important",
  },
  boldFont: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontWeight: 700,
    fontSize: "1.5rem",
    color: theme.palette.secondary.dark,
  },
  lightFont: {
    fontFamily: ["Roboto", "sans-serif"].join(","),
    fontWeight: 300,
    fontSize: "1.5rem",
    color: theme.palette.primary.dark,
  },
}));

export const Logo = () => {
  const classes = useStyles();

  return (
    <Link
      component={RouterLink}
      to={{ pathname: "/", state: { title: "7 days Forecast" } }}
      className={classes.logo}>
      <Typography variant="h6" component="h1">
        <span className={classes.boldFont}>hiroko</span>
        <span className={classes.lightFont}>ymj.com</span>
      </Typography>
    </Link>
  );
};
