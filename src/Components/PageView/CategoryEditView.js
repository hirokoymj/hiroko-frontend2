import React from "react";
import { Field, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { useParams } from "react-router-dom";

import { CategoryEditFormController } from "Components/FormController/CategoryEditFormController";
import { FormTextField } from "../Forms/FormTextField";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { FormSkelton } from "Components/Skelton/FormSkelton";

const CategoryEditFormFields = ({ onSubmit, submitting }) => {
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
        margin="normal"
        disabled={submitting}
        onClick={onSubmit}
      >
        {submitting ? "Updating" : "Update"}
      </Button>
    </>
  );
};

const CategoryEditForm = reduxForm({
  form: "Category_Edit_Form",
})(({ handleSubmit, submitting, loading }) => {
  return (
    <>
      {loading ? (
        <FormSkelton fieldCount={2} />
      ) : (
        <CategoryEditFormFields
          onSubmit={handleSubmit}
          submitting={submitting}
        />
      )}
    </>
  );
});

export const CategoryEditView = () => {
  let { id } = useParams();

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Grid item xs={12} md={6}>
              <CategoryEditFormController categoryId={id}>
                {(props) => <CategoryEditForm {...props} />}
              </CategoryEditFormController>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
