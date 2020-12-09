import React from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { CategoryFormController } from "Components/FormController/CategoryFormController";
import { FormTextField } from "../Forms/FormTextField";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { Title } from "Components/Titles/Title";
import { CategoryTable } from "Components/Tables/CategoryTable";

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));

const CategoryFormFields = connect((state) => ({
  categoryId: formValueSelector("Topic_Form")(state, "categoryId"),
}))(({ onSubmit, submitting }) => {
  return (
    <>
      <Field
        name="name"
        component={FormTextField}
        fullWidth
        variant="outlined"
        label="Category Name"
        margin="normal"
      />
      <Field
        name="order"
        component={FormTextField}
        type="text"
        fullWidth
        variant="outlined"
        label="Order"
        margin="normal"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={submitting}
        onClick={onSubmit}
      >
        {submitting ? "Submitting" : "Submit"}
      </Button>
    </>
  );
});

const CategoryForm = reduxForm({
  form: "Category_Form",
})(({ handleSubmit, submitting }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Create Category</Title>
          <Grid item xs={12} md={6}>
            <CategoryFormFields
              onSubmit={handleSubmit}
              submitting={submitting}
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <Title>Category List</Title>
          <CategoryTable />
        </Paper>
      </Grid>
    </Grid>
  );
});

export const CategoryView = () => {
  return (
    <DashboardLayout>
      <CategoryFormController>
        {(props) => <CategoryForm {...props} />}
      </CategoryFormController>
    </DashboardLayout>
  );
};
