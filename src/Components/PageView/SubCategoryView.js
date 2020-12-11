import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import { SubCategoryFormController } from "Components/FormController/SubCategoryFormController";
import { FormTextField } from "../Forms/FormTextField";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { Title } from "Components/Titles/Title";
import { SubCategoryTable } from "Components/Tables/SubCategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";

const SubCategoryFormFields = ({ onSubmit, submitting }) => {
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

const SubCategoryForm = reduxForm({
  form: "Category_Form",
})(({ handleSubmit, submitting }) => {
  return (
    <SubCategoryFormFields onSubmit={handleSubmit} submitting={submitting} />
  );
});

export const SubCategoryView = () => {
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
      console.log("handleDeleteCategory");
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
            <Title>Create Category</Title>
            <Grid item xs={12} md={6}>
              <SubCategoryFormController>
                {(props) => <SubCategoryForm {...props} />}
              </SubCategoryFormController>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Title>Sub Category List</Title>
            <SubCategoryTable openDialog={handleOpen} />
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
