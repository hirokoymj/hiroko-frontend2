import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { CategoryFormController } from "Components/FormController/CategoryFormController";
import { FormTextField } from "../Forms/FormTextField";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CategoryTable } from "Components/Tables/CategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";
import { Title } from "Components/Titles/Title";
import { CategoryEditView } from "Components/PageView/CategoryEditView";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "30%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));
const CategoryFormFields = ({ onSubmit, submitting }) => {
  const classes = useStyles();

  return (
    <>
      <Field
        name="name"
        component={FormTextField}
        fullWidth
        variant="outlined"
        label="Category Name"
      />
      <Field
        name="abbr"
        component={FormTextField}
        type="text"
        fullWidth
        variant="outlined"
        label="Abbreviation"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
        onClick={onSubmit}
        className={classes.button}
      >
        {submitting ? "Submitting" : "Submit"}
      </Button>
    </>
  );
};

const CategoryForm = reduxForm({
  form: "Category_Form",
})(({ handleSubmit, submitting }) => {
  return <CategoryFormFields onSubmit={handleSubmit} submitting={submitting} />;
});

export const CategoryView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [
      {
        query: CATEGORIES,
        variables: { limit: 5, cursor: null },
        fetchPolicy: "network-only",
      },
    ],
  });

  const handleClose = () => setOpen(false);

  const handleOpen = (e, id) => {
    e.preventDefault();
    setCategoryId(id);
    setOpen(true);
  };

  const handleDeleteCategory = async () => {
    try {
      await deleteCategory({
        variables: {
          id: categoryId,
        },
      });
      enqueueSnackbar("Category successfully deleted!", {
        variant: "success",
      });
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Switch>
        <Route path={`/categoryList/:id`} component={CategoryEditView} />
      </Switch>
      <DashboardLayout title="Category">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={5}>
            <Paper>
              <Title text="Create Category" />
              <CategoryFormController>
                {(props) => <CategoryForm {...props} />}
              </CategoryFormController>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <CategoryTable openDialog={handleOpen} />
            </Paper>
          </Grid>
        </Grid>
        <AlertDialog
          open={open}
          onClose={handleClose}
          title="Delete Category"
          content={
            <>
              <Typography component="p" variant="body1">
                Are you sure to delete the category?
              </Typography>
            </>
          }
          actionLabel="Delete"
          action={handleDeleteCategory}
          cancelLabel="Cancel"
          cancel={handleClose}
        />
      </DashboardLayout>
    </>
  );
};
