import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  sectionTitle: {
    fontFamily: ["Titillium Web", "sans-serif"].join(","),
  },
}));

export const Title = (props) => {
  const classes = useStyles();
  return (
    <Typography
      component="h2"
      variant="h5"
      color="primary"
      gutterBottom
      className={classes.sectionTitle}
    >
      {props.children}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};
