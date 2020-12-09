import React, { useState } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { connect } from "react-redux";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { CategoryFormController } from "Components/FormController/CategoryFormController";
import { FormTextField } from "../Forms/FormTextField";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { Title } from "Components/Titles/Title";
import { CategoryTable } from "Components/Tables/CategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
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
  return <CategoryFormFields onSubmit={handleSubmit} submitting={submitting} />;
});

export const CategoryView = () => {
  const classes = useStyles();
  const [open, setDialogOpen] = useState(false);
  const [categoryId, setCategoryId] = useState("");
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [{ query: CATEGORIES }],
  });

  const handleCloseDialog = () => setDialogOpen(false);

  const handleOpenDialog = (e, id) => {
    e.preventDefault();
    setCategoryId(id);
    setDialogOpen(true);
  };

  const handleDeleteCategory = async () => {
    try {
      console.log("handleDeleteCategory");
      const { data } = await deleteCategory({
        variables: {
          id: categoryId,
        },
      });
      console.log("success to delete");
      setDialogOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>Create Category</Title>
            <Grid item xs={12} md={6}>
              <CategoryFormController>
                {(props) => <CategoryForm {...props} />}
              </CategoryFormController>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Title>List Category</Title>
            <CategoryTable openDialog={handleOpenDialog} />
          </Paper>
        </Grid>
      </Grid>
      <AlertDialog
        open={open}
        onClose={handleCloseDialog}
        title="Delete Category"
        content={
          <>
            <Typography component="p" variant="body1">
              Do you want to to delete category? - id: {categoryId}
            </Typography>
          </>
        }
        actionLabel="Delete"
        action={handleDeleteCategory}
        cancelLabel="Cancel"
        cancel={handleCloseDialog}
      />
    </DashboardLayout>
  );
};
