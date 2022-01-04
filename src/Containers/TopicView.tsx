import React, { useState } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { TopicFormController } from "Components/FormController/TopicFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { TopicTable } from "Components/Tables/TopicTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_TOPIC } from "Mutations/Topic";
import { TOPICS } from "Queries/Topic";
import { TopicEditView } from "Containers/TopicEditView";
import { makeStyles } from "@material-ui/core/styles";
import { IDeleteTopicVars, ITopic } from "Types/api/Topic";
import { TTopicFormData, IFormSelectOptions } from "Types/forms";
import { useLazyQuery } from "@apollo/react-hooks";
import { SUB_CATEGORY_BY_CATEGORY } from "Queries/SubCategory";
import {
  ISubCategory,
  ISubCategoryByCategoryVars,
} from "Types/api/SubCategory";
import { makeDropdownOptions } from "Components/FormController/common";
import { RootState } from "Redux/ReduxProvider";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "50%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

interface IProps extends InjectedFormProps<TTopicFormData> {
  category_options: IFormSelectOptions[];
  subCategory_options: IFormSelectOptions[];
  loading: boolean;
}

const TopicFormFields = (props: IProps) => {
  const classes = useStyles();
  const { handleSubmit, submitting, category_options, loading } = props;

  let options: any = [];
  const [getSubCategoryByCategory, { data, loading: subCategoryLoading }] =
    useLazyQuery<ISubCategory, ISubCategoryByCategoryVars>(
      SUB_CATEGORY_BY_CATEGORY
    );
  if (!subCategoryLoading) {
    options = makeDropdownOptions(
      data,
      "subCategoryByCategory",
      subCategoryLoading
    );
  }

  return (
    <>
      <Field
        name="category"
        component={FormSelect}
        fullWidth
        variant="outlined"
        label="Category"
        options={category_options}
        onChange={(event: any, newVal: string) => {
          getSubCategoryByCategory({
            variables: { categoryId: newVal },
          });
        }}
        disabled={loading || subCategoryLoading}
      />
      <Field
        name="subCategory"
        component={FormSelect}
        fullWidth
        variant="outlined"
        label="Sub Category"
        options={options}
        disabled={loading || subCategoryLoading}
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
        color="secondary"
        disabled={submitting}
        onClick={handleSubmit}
        className={classes.button}>
        {submitting ? "Submitting" : "Submit"}
      </Button>
    </>
  );
};

const TopicForm = reduxForm<TTopicFormData, IProps>({
  form: "Create_Topic_Form",
})(TopicFormFields);

export const TopicView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [topicId, setTopicId] = useState<string>("");
  const selectedFilters = useSelector(
    (state: RootState) => state.categoryFilter.value
  );

  const [deleteTopic, { loading }] = useMutation<ITopic, IDeleteTopicVars>(
    DELETE_TOPIC,
    {
      refetchQueries: [
        {
          query: TOPICS,
          variables: {
            limit: 10,
            cursor: null,
            ...(selectedFilters.length !== 0 && {
              filter: selectedFilters,
            }),
          },
          fetchPolicy: "network-only",
        },
      ],
    }
  );

  const handleClose = () => setOpen(false);

  const handleOpen = (id: string) => {
    setTopicId(id);
    setOpen(true);
  };

  const handleDeleteTopic = async () => {
    try {
      await deleteTopic({
        variables: {
          id: topicId,
        },
      });
      enqueueSnackbar("Topic successfully deleted!", {
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
        <Route path={`/topicList/:id`} component={TopicEditView} />
      </Switch>
      <DashboardLayout title="Technical Topics">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={6}>
            <Paper>
              <TopicFormController>
                {(props: any) => <TopicForm {...props} />}
              </TopicFormController>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <TopicTable openDialog={handleOpen} />
            </Paper>
          </Grid>
        </Grid>
        <AlertDialog
          open={open}
          onClose={handleClose}
          title="Delete Topic"
          content={
            <>
              <Typography component="p" variant="body1">
                Do you want to to delete a topic?
              </Typography>
            </>
          }
          actionLabel={loading ? "Deleting" : "Delete"}
          action={handleDeleteTopic}
          cancelLabel="Cancel"
          cancel={handleClose}
        />
      </DashboardLayout>
    </>
  );
};
