import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";
import { useLazyQuery } from "@apollo/react-hooks";

import FormDropdown from "Components/Inputs/FormDropdown";
import { makeDropdownOptions } from "Components/FormController/common";
import { SUB_CATEGORY_BY_CATEGORY } from "Queries/SubCategory";
import FormTextField from "Components/Inputs/FormTextField";
import {
  ISubCategory,
  ISubCategoryByCategoryVars,
} from "Types/api/SubCategory";
import { topicFormSchema } from "Containers/validation/formValidations";
import { ITopicFormFields, IFormSelectOptions } from "Types/forms";
import { useTopicForm } from "Hooks/useTopicForm";
import { FormInputText } from "Components/FormComponents-new/FormInputText";
import { FormInputDropdown } from "Components/FormComponents-new/FormInputDropdown";

export const TopicForm = () => {
  const methods = useForm<ITopicFormFields>({
    resolver: yupResolver(topicFormSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
    getValues,
    watch,
  } = methods;
  const { loading, category_options, onSubmit } = useTopicForm();

  // useEffect(() => {
  //   if (isSubmitSuccessful) reset();
  // }, [isSubmitSuccessful, reset]);

  // SubCategory
  // const [
  //   getSubCategoryByCategory,
  //   { data: subCategoryData, loading: subCategoryLoading },
  // ] = useLazyQuery<ISubCategory, ISubCategoryByCategoryVars>(
  //   SUB_CATEGORY_BY_CATEGORY
  // );
  // // SubCategory dropdown!!
  // const subCategory_options = makeDropdownOptions(
  //   subCategoryData,
  //   "subCategoryByCategory",
  //   subCategoryLoading
  // );

  // const handleCategoryChange = async (
  //   e: React.ChangeEvent<{ value: unknown }>
  // ) => {
  //   const newVal = e.target.value as string;
  //   methods.setValue("category", newVal); // IMPORTANT since getValues("category") won't work.
  //   await getSubCategoryByCategory({
  //     variables: { categoryId: newVal },
  //   });
  // };

  return (
    <>
      {loading ? (
        <p>...loading</p>
      ) : (
        <Grid container direction="column">
          <FormProvider {...methods}>
            <Grid item>
              {/* <FormDropdown
                name="category"
                label="Category"
                options={category_options}
                onChange={handleCategoryChange}
                disabled={loading || subCategoryLoading}
              /> */}
              <FormInputDropdown
                name="category"
                label="Category"
                options={category_options}
                disabled={loading}
              />
            </Grid>
            {/* <Grid item>
              <FormDropdown
                name="subCategory"
                label="Sub Category"
                disabled={loading || subCategoryLoading}
                options={subCategory_options}
              />
            </Grid> */}
            <Grid item>
              <FormInputText label="Title" name="title" />
            </Grid>
            <Grid item>
              <FormInputText label="URL" name="url" />
            </Grid>
            <Grid item>
              <FormInputText label="order" name="order" type="number" />
            </Grid>
            <Grid item>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                onClick={methods.handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Grid>
          </FormProvider>
        </Grid>
      )}
    </>
  );
};
