import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";

import { SubCategoryFormController } from "Components/FormController/SubCategoryFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { Title } from "Components/Titles/Title";
import { SubCategoryTable } from "Components/Tables/SubCategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORIES } from "Queries/SubCategory";

const SubCategoryFormFields = ({ onSubmit, submitting, category_options }) => {
  console.log("SubCategoryFormFiled");
  console.log(category_options);
  return (
    <>
      <Field
        name="categoryId"
        component={FormSelect}
        fullWidth
        variant="outlined"
        label="Category"
        placeholder="Select Category"
        options={category_options}
      />
      <Field
        name="name"
        component={FormTextField}
        fullWidth
        variant="outlined"
        label="Sub Category"
      />
      <Field
        name="order"
        component={FormTextField}
        type="number"
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
  form: "Sub_Category_Form",
})(({ handleSubmit, submitting, category_options }) => {
  return (
    <SubCategoryFormFields
      onSubmit={handleSubmit}
      submitting={submitting}
      category_options={category_options}
    />
  );
});

export const SubCategoryView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [deleteSubCategory] = useMutation(DELETE_SUB_CATEGORY, {
    refetchQueries: [{ query: SUB_CATEGORIES }],
  });

  const handleClose = () => setOpen(false);

  const handleOpen = (e, id) => {
    e.preventDefault();
    setSubCategoryId(id);
    setOpen(true);
  };

  const handleDeleteSubCategory = async () => {
    try {
      await deleteSubCategory({
        variables: {
          id: subCategoryId,
        },
      });
      enqueueSnackbar("Sub Category successfully deleted!", {
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
            <Title>Create Sub Category</Title>
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
        title="Delete Sub Category"
        content={
          <>
            <Typography component="p" variant="body1">
              Do you want to to delete sub category?
            </Typography>
          </>
        }
        actionLabel="Delete"
        action={handleDeleteSubCategory}
        cancelLabel="Cancel"
        cancel={handleClose}
      />
    </DashboardLayout>
  );
};
