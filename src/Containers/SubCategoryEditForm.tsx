import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";

import { ISubCategoryFormFields } from "Types/forms";
// import FormDropdown from "Components/Inputs/FormDropdown";
import { subCategoryFormSchema } from "./validation/formValidations";
import { FormInputText } from "Components/FormComponents-new/FormInputText";
import { FormInputDropdown } from "Components/FormComponents-new/FormInputDropdown";

type dropdownOption = {
  label: string;
  value: string;
};
interface IProps {
  onSubmit: (value: ISubCategoryFormFields) => void;
  category_options: dropdownOption[];
  loading: boolean;
  initialValues: any;
}
export const SubCategoryEditForm = (props: IProps) => {
  const { onSubmit, category_options, initialValues } = props;
  const methods = useForm<ISubCategoryFormFields>({
    resolver: yupResolver(subCategoryFormSchema),
    defaultValues: initialValues,
  });

  const { handleSubmit } = methods;

  return (
    <Grid container direction="column" spacing={3}>
      <FormProvider {...methods}>
        <Grid item xs={12}>
          <FormInputDropdown
            name="categoryId"
            label="Category"
            options={category_options}
          />
        </Grid>
        <Grid item xs={12}>
          <FormInputText label="Sub Category Name" name="name" />
        </Grid>
        <Grid item xs={12}>
          <FormInputText label="Order" name="order" type="number" />
        </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit(onSubmit)}>
            Edit
          </Button>
        </Grid>
      </FormProvider>
    </Grid>
  );
};
