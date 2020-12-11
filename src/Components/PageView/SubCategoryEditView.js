import React from "react";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";

import { SubCategoryEditFormController } from "Components/FormController/SubCategoryEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { Title } from "Components/Titles/Title";

const SubCategoryEditFormFields = ({
  onSubmit,
  submitting,
  category_options,
}) => {
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
        label="Sub Category Name"
      />
      <Field
        name="order"
        component={FormTextField}
        type="number"
        fullWidth
        variant="outlined"
        label="Display Order"
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        disabled={submitting}
        onClick={onSubmit}
      >
        {submitting ? "Updating" : "Update"}
      </Button>
    </>
  );
};

const SubCategoryEditForm = reduxForm({
  form: "Sub_Category_Edit_Form",
})(({ handleSubmit, submitting, category_options, initialValues, loading }) => {
  return (
    !loading && (
      <SubCategoryEditFormFields
        onSubmit={handleSubmit}
        submitting={submitting}
        category_options={category_options}
        initialValues={initialValues}
      />
    )
  );
});

export const SubCategoryEditView = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Title>Edit Sub Category</Title>
            <Grid item xs={12} md={6}>
              <SubCategoryEditFormController subCategoryId={id}>
                {(props) => <SubCategoryEditForm {...props} />}
              </SubCategoryEditFormController>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
