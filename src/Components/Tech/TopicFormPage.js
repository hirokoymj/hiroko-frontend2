import React, { useState } from "react";
import { Field, reduxForm, formValueSelector } from "redux-form";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { useMutation } from "@apollo/react-hooks";

import { TopicFormController } from "../FormController/TopicFormController";
import { FormSelect } from "../Forms/FormSelect";
import { FormTextField } from "../Forms/FormTextField";
import { TopicTable } from "./TopicTable";
import { AlertDialog } from "../Dialog/AlertDialog";
import { DELETE_TOPIC_BY_ID } from "../../Mutations/Topic";
import { ALL_TOPIC_VIEWS } from "../../Queries/Topic";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  // form: {
  //   width: "100%", // Fix IE 11 issue.
  //   marginTop: theme.spacing(1),
  // },
}));

const TopicFormFields = connect((state) => ({
  categoryId: formValueSelector("Topic_Form")(state, "categoryId"),
}))(
  ({
    onSubmit,
    submitting,
    category_options,
    subcategory_options,
    categoryId,
  }) => {
    const classes = useStyles();
    return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Typography component="h1" variant="h5" gutterBottom>
            Create New Topic
          </Typography>
          <Field
            name="categoryId"
            component={FormSelect}
            fullWidth
            variant="outlined"
            label="Category"
            options={category_options}
          />
          <Field
            name="subcategoryId"
            component={FormSelect}
            fullWidth
            variant="outlined"
            label="Sub Category"
            options={subcategory_options.filter(
              (option) => option.categoryId === categoryId
            )}
          />
          <Field
            name="title"
            component={FormTextField}
            type="text"
            label="Title"
            variant="outlined"
            fullWidth
          />
          <Field
            name="url"
            component={FormTextField}
            type="url"
            label="URL"
            variant="outlined"
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={submitting}
            onClick={onSubmit}
          >
            Submit
          </Button>
        </div>
      </Container>
    );
  }
);

const TopicForm = reduxForm({
  form: "Topic_Form",
})(
  ({
    handleSubmit,
    submitting,
    category_options,
    subcategory_options,
    loading,
    initialValues,
  }) => {
    return (
      <>
        {!loading && (
          <TopicFormFields
            onSubmit={handleSubmit}
            submitting={submitting}
            category_options={category_options}
            subcategory_options={subcategory_options}
            initialValues={initialValues}
          />
        )}
      </>
    );
  }
);

export const TopicFormPage = () => {
  const [open, setOpen] = useState(false);
  const [topicId, setTopicId] = useState("");
  const [deleteTopicById] = useMutation(DELETE_TOPIC_BY_ID, {
    refetchQueries: [{ query: ALL_TOPIC_VIEWS }],
  });

  const dialogAction = () => {
    try {
      deleteTopicById({
        variables: {
          topicId: { id: topicId },
        },
      });
    } catch (e) {
      console.error(e);
    }
    onClose();
  };

  const openDialog = (event, topicId) => {
    event.preventDefault();
    setTopicId(topicId);
    setOpen(true);
  };
  const onClose = () => setOpen(false);

  return (
    <>
      <TopicFormController>
        {(props) => <TopicForm {...props} />}
      </TopicFormController>
      <TopicTable openDialog={openDialog} />
      <AlertDialog
        open={open}
        title="Delete Topic"
        text="Are you sure to delete the topic?"
        action={dialogAction}
        actionLabel="Delete"
        onClose={onClose}
      />
    </>
  );
};
