import React, { useState } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import { CategoryFormController } from "Components/FormController/CategoryFormController";
import { FormTextField } from "../Forms/FormTextField";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CategoryTable } from "Components/Tables/CategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";
import { Title } from "Components/Titles/Title";
import { CategoryEditView } from "Components/PageView/CategoryEditView";
import { ICategoryFormData } from "Types/forms";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "30%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
}));

type CategoryFormFieldsProps = InjectedFormProps<ICategoryFormData>;

const CategoryFormFields = (props: CategoryFormFieldsProps) => {
  const classes = useStyles();
  const { handleSubmit, submitting } = props;

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
        name="abbr"
        component={FormTextField}
        type="text"
        fullWidth
        variant="outlined"
        label="Abbreviation"
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

const CategoryForm = reduxForm<ICategoryFormData>({
  form: "Category_Form",
})(CategoryFormFields);

export const CategoryView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [deleteCategory] = useMutation(DELETE_CATEGORY, {
    refetchQueries: [
      {
        query: CATEGORIES,
        variables: { limit: 5, cursor: null },
        fetchPolicy: "network-only",
      },
    ],
  });

  const handleClose = () => setOpen(false);

  const handleOpen = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
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
    <>
      <Switch>
        <Route path={`/categoryList/:id`} component={CategoryEditView} />
      </Switch>
      <DashboardLayout title="Category">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={5}>
            <Paper>
              <Title text="Create Category" />
              <CategoryFormController>
                {(props: any) => <CategoryForm {...props} />}
              </CategoryFormController>
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
                Are you sure to delete the category?
              </Typography>
            </>
          }
          actionLabel="Delete"
          action={handleDeleteCategory}
          cancelLabel="Cancel"
          cancel={handleClose}
        />
      </DashboardLayout>
    </>
  );
};
