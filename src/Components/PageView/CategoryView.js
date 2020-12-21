import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import { CategoryFormController } from "Components/FormController/CategoryFormController";
import { FormTextField } from "../Forms/FormTextField";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CategoryTable } from "Components/Tables/CategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";
import { Title } from "Components/Titles/Title";

const CategoryFormFields = ({ onSubmit, submitting }) => {
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
        name="order"
        component={FormTextField}
        type="text"
        fullWidth
        variant="outlined"
        label="Order"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
        onClick={onSubmit}
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
    refetchQueries: [{ query: CATEGORIES }],
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
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Title text="Create Category" />
            <Grid item xs={12} md={6}>
              <CategoryFormController>
                {(props) => <CategoryForm {...props} />}
              </CategoryFormController>
            </Grid>
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
              Do you want to to delete category? - id: {categoryId}
            </Typography>
          </>
        }
        actionLabel="Delete"
        action={handleDeleteCategory}
        cancelLabel="Cancel"
        cancel={handleClose}
      />
    </DashboardLayout>
  );
};
