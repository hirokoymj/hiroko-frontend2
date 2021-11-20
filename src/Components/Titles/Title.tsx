import React from "react";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  sectionTitle: {
    fontFamily: ["Titillium Web", "sans-serif"].join(","),
    marginBottom: theme.spacing(2),
  },
}));

type Props = {
  text: string;
};

export const Title = ({ text }: Props) => {
  const classes = useStyles();
  return (
    <Typography
      component="h2"
      variant="h5"
      color="secondary"
      className={classes.sectionTitle}
      noWrap>
      {text}
    </Typography>
  );
};

Title.propTypes = {
  children: PropTypes.node,
};
