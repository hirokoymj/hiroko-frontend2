import React, { useState } from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
// import Typography from "@material-ui/core/Typography";
// import { useSnackbar } from "notistack";
import { connect } from "react-redux";

import { TopicFormController } from "Components/FormController/TopicFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { Title } from "Components/Titles/Title";
import { TopicTable } from "Components/Tables/TopicTable";
// import { AlertDialog } from "Components/Dialog/AlertDialog";
// import { DELETE_SUB_CATEGORY } from "Mutations/SubCategory";
// import { SUB_CATEGORIES } from "Queries/SubCategory";

const TopicFormFields = connect((state) => ({
  categoryId: formValueSelector("Create_Topic_Form")(state, "category"),
}))(
  ({
    onSubmit,
    submitting,
    category_options,
    subCategory_options,
    categoryId,
  }) => {
    return (
      <>
        <Field
          name="category"
          component={FormSelect}
          fullWidth
          variant="outlined"
          label="Category"
          options={category_options}
        />
        <Field
          name="subCategory"
          component={FormSelect}
          fullWidth
          variant="outlined"
          label="Sub Category"
          options={subCategory_options.filter(
            (option) => option.categoryId === categoryId
          )}
        />
        <Field
          name="title"
          component={FormTextField}
          fullWidth
          variant="outlined"
          label="Title"
        />
        <Field
          name="url"
          component={FormTextField}
          fullWidth
          variant="outlined"
          label="URL"
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
  }
);

const TopicForm = reduxForm({
  form: "Create_Topic_Form",
})(({ handleSubmit, submitting, category_options, subCategory_options }) => {
  return (
    <TopicFormFields
      onSubmit={handleSubmit}
      submitting={submitting}
      category_options={category_options}
      subCategory_options={subCategory_options}
    />
  );
});

export const TopicView = () => {
  // const { enqueueSnackbar } = useSnackbar();
  // const [open, setOpen] = useState(false);
  // const [subCategoryId, setSubCategoryId] = useState("");
  // const [deleteSubCategory] = useMutation(DELETE_SUB_CATEGORY, {
  //   refetchQueries: [{ query: SUB_CATEGORIES }],
  // });

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Title>Create Technical Topic</Title>
            <Grid item xs={12} md={6}>
              <TopicFormController>
                {(props) => <TopicForm {...props} />}
              </TopicFormController>
            </Grid>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper>
            <Title>Topic List</Title>
            <TopicTable />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
