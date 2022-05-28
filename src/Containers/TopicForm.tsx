import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";

import { topicFormSchema } from "Containers/validation/formValidations";
import { ITopicFormFields } from "Types/forms";
import { useTopicForm } from "Hooks/useTopicForm";
import { FormInputText } from "Components/FormComponents-new/FormInputText";
import { FormInputDropdown } from "Components/FormComponents-new/FormInputDropdown";
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
  // console.log(selectedCategory);
  const dispatch = useDispatch();
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
  );
};
