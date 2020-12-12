import React from "react";
import { Field, formValueSelector, reduxForm } from "redux-form";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { TopicEditFormController } from "Components/FormController/TopicEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { Title } from "Components/Titles/Title";

const TopicEditFormFields = connect((state) => ({
  categoryId: formValueSelector("Topic_Edit_Form")(state, "category"),
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

const TopicEditForm = reduxForm({
  form: "Topic_Edit_Form",
})(
  ({
    handleSubmit,
    submitting,
    category_options,
    subCategory_options,
    loading,
  }) => {
    return (
      !loading && (
        <TopicEditFormFields
          onSubmit={handleSubmit}
          submitting={submitting}
          category_options={category_options}
          subCategory_options={subCategory_options}
        />
      )
    );
  }
);

export const TopicEditView = () => {
  const { id } = useParams();

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper>
            <Title>Create Technical Topic</Title>
            <Grid item xs={12} md={6}>
              <TopicEditFormController topicId={id}>
                {(props) => <TopicEditForm {...props} />}
              </TopicEditFormController>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
