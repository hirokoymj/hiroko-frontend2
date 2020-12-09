import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { setTitle } from "Redux/Title/ActionCreator";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

export const DashboardLayout = connect(null, { setTitle })(
  ({ setTitle, children }) => {
    const classes = useStyles();
    const location = useLocation();

    if (location.state) {
      setTitle(location.state.title);
    } else {
      setTitle("");
    }

    return (
      <div className={classes.root}>
        <Container maxWidth="lg" className={classes.container}>
          {children}
        </Container>
      </div>
    );
  }
);

DashboardLayout.propTypes = {
  children: PropTypes.node.isRequired,
};
