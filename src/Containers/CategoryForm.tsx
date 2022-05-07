import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";

import { ICategoryFormFields } from "Types/forms";
import { categoryFormSchema } from "./validation/formValidations";
import { useCategoryForm } from "Hooks/useCategoryForm";
import { FormInputText } from "Components/FormComponents-new/FormInputText";

export const CategoryForm = () => {
  const defaultValues = { name: "", abbr: "" };
  const methods = useForm<ICategoryFormFields>({
    resolver: yupResolver(categoryFormSchema),
    defaultValues,
  });
  const { onSubmit } = useCategoryForm();

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) reset({ ...defaultValues });
  }, [isSubmitSuccessful, reset]);

  return (
    <Grid container direction="column">
      <FormProvider {...methods}>
        <Grid item xs={12}>
          <FormInputText label="Category name" name="name" />
        </Grid>
        <Grid item>
          <FormInputText label="Abbreviation" name="abbr" />
        </Grid>
      </FormProvider>
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
    </Grid>
  );
};
