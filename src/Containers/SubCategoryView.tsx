import { useState } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import { FormControl } from "@material-ui/core";

import { SubCategoryFormController } from "Components/FormController/SubCategoryFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { SubCategoryTable } from "Components/Tables/SubCategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { SubCategoryEditView } from "Containers/SubCategoryEditView";
import { TSubCategoryFormData } from "Types/forms";
import { RootState } from "Redux/ReduxProvider";
import { IDeleteSubCategoryVars, ISubCategory } from "Types/api/SubCategory";

const useStyles = makeStyles((theme) => ({
  button: {
    width: "50%",
    margin: "auto",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  orderField: {
    width: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  formControl: {
    marginBottom: "0 !important",
  },
}));

interface IProps extends InjectedFormProps<TSubCategoryFormData> {
  category_options: [];
  onSubmit: any;
  loading: boolean;
}

const SubCategoryFormFields = (props: IProps) => {
  const classes = useStyles();
  const { handleSubmit, submitting, category_options, loading } = props;
  return (
    <div>
      <>
        {loading ? (
          <FormSkeleton fieldCount={2} />
        ) : (
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
              fullWidth
              variant="outlined"
              label="order"
              type="number"
              classes={{ root: classes.orderField }}
            />
            <FormControl fullWidth classes={{ root: classes.formControl }}>
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={submitting}
                onClick={handleSubmit}
                className={classes.button}>
                {submitting ? "Submitting" : "Submit"}
              </Button>
            </FormControl>
          </>
        )}
      </>
    </div>
  );
};

const SubCategoryForm = reduxForm<TSubCategoryFormData, IProps>({
  form: "Sub_Category_Form",
})(SubCategoryFormFields);

export const SubCategoryView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const selectedFilters = useSelector(
    (state: RootState) => state.categoryFilter.value
  );
  const [open, setOpen] = useState(false);
  const [subCategoryId, setSubCategoryId] = useState("");
  const [deleteSubCategory] = useMutation<ISubCategory, IDeleteSubCategoryVars>(
    DELETE_SUB_CATEGORY,
    {
      refetchQueries: [
        {
          query: SUB_CATEGORIES,
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

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (id: string) => {
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
    <>
      <Switch>
        <Route path={`/subCategoryList/:id`} component={SubCategoryEditView} />
      </Switch>
      <DashboardLayout title="Sub Category">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={5}>
            <Paper>
              <SubCategoryFormController>
                {(props: any) => <SubCategoryForm {...props} />}
              </SubCategoryFormController>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
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
                Are you sure to delete the sub category?
              </Typography>
            </>
          }
          actionLabel="Delete"
          action={handleDeleteSubCategory}
          cancelLabel="Cancel"
          cancel={handleClose}
        />
      </DashboardLayout>
    </>
  );
};
