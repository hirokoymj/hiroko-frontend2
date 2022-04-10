import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { CategoryFormController } from "Components/FormController/CategoryFormController";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { CategoryTable } from "Components/Tables/CategoryTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_CATEGORY } from "Mutations/Category";
import { CATEGORIES } from "Queries/Category";
import { Title } from "Components/Titles/Title";
import { CategoryEditView } from "Containers/CategoryEditView";
import { RootState } from "Redux/ReduxProvider";
import { IDeleteCategoryVars, ICategory } from "Types/api/Category";
import { CategoryForm } from "./CategoryForm";

export const CategoryView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const selectedFilters = useSelector(
    (state: RootState) => state.categoryFilter.value
  );
  const [open, setOpen] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<string>("");
  const [deleteCategory] = useMutation<ICategory, IDeleteCategoryVars>(
    DELETE_CATEGORY,
    {
      refetchQueries: [
        {
          query: CATEGORIES,
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
                {(props: any) => <CategoryForm onSubmit={props.onSubmit} />}
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
