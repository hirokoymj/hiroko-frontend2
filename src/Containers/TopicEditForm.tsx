import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button } from "@material-ui/core";
import { FormProvider, useForm } from "react-hook-form";

import { topicFormSchema } from "Containers/validation/formValidations";
import { ITopicFormFields } from "Types/forms";
import { FormInputDropdown } from "Components/FormComponents-new/FormInputDropdown";
import { FormInputText } from "Components/FormComponents-new/FormInputText";

type dropdownOption = {
  label: string;
  value: string;
};
interface IProps {
  onSubmit: (value: ITopicFormFields) => void;
  category_options: dropdownOption[];
  subCategory_options: dropdownOption[];
  loading: boolean;
  defaultValues: any;
}

export const TopicEditForm = (props: IProps) => {
  const {
    onSubmit,
    category_options,
    subCategory_options,
    defaultValues,
    loading,
  } = props;

  const methods = useForm<ITopicFormFields>({
    resolver: yupResolver(topicFormSchema),
    defaultValues: defaultValues as any, //TODO: any should replace some type
  });

  return (
    <Grid container direction="column" spacing={3}>
      <FormProvider {...methods}>
        <Grid item>
          <FormInputDropdown
            name="category"
            label="Category"
            options={category_options}
            disabled={loading}
            readOnly
          />
        </Grid>
        <Grid item>
          <FormInputDropdown
            name="subCategory"
            label="Sub Category"
            disabled={loading}
            options={subCategory_options}
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
            onClick={methods.handleSubmit(onSubmit)}>
            Edit
          </Button>
        </Grid>
      </FormProvider>
    </Grid>
  );
};
