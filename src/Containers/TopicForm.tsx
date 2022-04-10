import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import FormDropdown from "Components/Inputs/FormDropdown";

import { makeDropdownOptions } from "Components/FormController/common";
import { useLazyQuery } from "@apollo/react-hooks";
import { SUB_CATEGORY_BY_CATEGORY } from "Queries/SubCategory";
import { ITopicFormFields, IFormSelectOptions } from "Types/forms";
import FormTextField from "Components/Inputs/FormTextField";

import {
  ISubCategory,
  ISubCategoryByCategoryVars,
} from "Types/api/SubCategory";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
  },
}));

const formSchema = yup.object().shape({
  category: yup.string().required(),
  subCategory: yup.string().required(),
  title: yup.string().required(),
  url: yup.string().required(),
  order: yup.string().optional(),
});

interface IProps {
  onSubmit: () => void;
  loading: boolean;
  category_options: IFormSelectOptions[] | [];
}

export const TopicForm = (props: IProps) => {
  const classes = useStyles();
  const { loading, category_options, onSubmit } = props;
  const methods = useForm<ITopicFormFields>({
    resolver: yupResolver(formSchema),
  });

  // SubCategory
  const [
    getSubCategoryByCategory,
    { data: subCategoryData, loading: subCategoryLoading },
  ] = useLazyQuery<ISubCategory, ISubCategoryByCategoryVars>(
    SUB_CATEGORY_BY_CATEGORY
  );
  // SubCategory dropdown!!
  const subCategory_options = makeDropdownOptions(
    subCategoryData,
    "subCategoryByCategory",
    subCategoryLoading
  );

  const handleCategoryChange = async (
    e: React.ChangeEvent<{ value: unknown }>
  ) => {
    const newVal = e.target.value as string;
    console.log(newVal);
    methods.setValue("category", newVal); // IMPORTANT since getValues("category") won't work.
    await getSubCategoryByCategory({
      variables: { categoryId: newVal },
    });
  };

  return (
    <>
      <Grid container>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ width: "100%" }}>
            <Grid item>
              <FormDropdown
                name="category"
                label="Category"
                options={category_options}
                onChange={handleCategoryChange}
                disabled={loading || subCategoryLoading}
              />
            </Grid>
            <Grid item>
              <FormDropdown
                name="subCategory"
                label="Sub Category"
                disabled={loading || subCategoryLoading}
                options={subCategory_options}
              />
            </Grid>
            <Grid item>
              <FormTextField label="Title" name="title" />
            </Grid>
            <Grid item>
              <FormTextField label="URL" name="url" />
            </Grid>
            <Grid item>
              <FormTextField label="order" name="order" type="number" />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}>
                Submit
              </Button>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </>
  );
};
