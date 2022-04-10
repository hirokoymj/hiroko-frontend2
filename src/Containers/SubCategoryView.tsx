import { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";

import { SubCategoryFormController } from "Components/FormController/SubCategoryFormController";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { SubCategoryTable } from "Components/Tables/SubCategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_SUB_CATEGORY } from "Mutations/SubCategory";
import { SUB_CATEGORIES } from "Queries/SubCategory";
import { SubCategoryEditView } from "Containers/SubCategoryEditView";
import { RootState } from "Redux/ReduxProvider";
import { IDeleteSubCategoryVars, ISubCategory } from "Types/api/SubCategory";
import { SubCategoryForm } from "Containers/SubCategoryForm";

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
                {(props: any) =>
                  !props.loading && <SubCategoryForm {...props} />
                }
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
