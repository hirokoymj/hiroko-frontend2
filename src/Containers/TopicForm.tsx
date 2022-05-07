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

import { useSelector, useDispatch } from "react-redux";
import { setCategory, resetCategory } from "Redux/ReactHookForm/categorySlice";
import { RootState } from "Redux/ReduxProvider";

export const TopicForm = () => {
  const methods = useForm<ITopicFormFields>({
    resolver: yupResolver(topicFormSchema),
  });
  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;
  const selectedCategory = useSelector(
    (state: RootState) => state.category.value
  );
  const dispatch = useDispatch();
  console.log(selectedCategory);
  const {
    loading,
    category_options,
    onSubmit,
    subCategory_options,
    defaultValues,
  } = useTopicForm(selectedCategory);

  useEffect(() => {
    if (isSubmitSuccessful) reset({ ...defaultValues });
    dispatch(resetCategory());
  }, [isSubmitSuccessful, reset]);

  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown; name?: string }>
  ) => {
    const newVal = event.target.value as string;
    dispatch(setCategory(newVal));
    return newVal;
  };

  return (
    <>
      {loading ? (
        <p>...loading</p>
      ) : (
        <Grid container direction="column">
          <FormProvider {...methods}>
            <Grid item>
              <FormInputDropdown
                name="category"
                label="Category"
                options={category_options}
                handleChange={handleCategoryChange}
                disabled={loading}
              />
              <FormInputDropdown
                name="subCategory"
                label="Sub Category"
                options={subCategory_options}
                disabled={loading}
              />
            </Grid>
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
                fullWidth
                onClick={handleSubmit(onSubmit)}>
                Submit
              </Button>
            </Grid>
          </FormProvider>
        </Grid>
      )}
    </>
  );
};
