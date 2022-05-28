import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";

import { ISubCategoryFormFields } from "Types/forms";
import { subCategoryFormSchema } from "./validation/formValidations";
import { useSubCategoryForm } from "Hooks/useSubCategoryForm";
import { FormInputText } from "Components/FormComponents-new/FormInputText";
import { FormInputDropdown } from "Components/FormComponents-new/FormInputDropdown";

export const SubCategoryForm = () => {
  const { onSubmit, category_options, loading } = useSubCategoryForm();
  const methods = useForm<ISubCategoryFormFields>({
    resolver: yupResolver(subCategoryFormSchema),
    defaultValues: {
      categoryId: "",
      name: "",
      order: "",
    },
  });

  const {
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = methods;

  useEffect(() => {
    if (isSubmitSuccessful) reset();
  }, [isSubmitSuccessful, reset]);

  return (
    <Grid container direction="column">
      <FormProvider {...methods}>
        <Grid item>
          <FormInputDropdown
            name="categoryId"
            label="Category"
            options={category_options}
            disabled={loading}
          />
        </Grid>
        <Grid item>
          <FormInputText label="Sub Category Name" name="name" />
        </Grid>
        <Grid item>
          <FormInputText label="Order" name="order" type="number" />
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
