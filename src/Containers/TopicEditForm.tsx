import { yupResolver } from "@hookform/resolvers/yup";
import { Grid, Button } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";

import FormDropdown from "Components/Inputs/FormDropdown";
import FormTextField from "Components/Inputs/FormTextField";
import { topicFormSchema } from "Containers/validation/formValidations";
import { ITopicFormFields, IFormSelectOptions } from "Types/forms";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
  },
}));

interface IProps {
  onSubmit: () => void;
  loading: boolean;
  category_options: IFormSelectOptions[] | [];
  subCategory_options: IFormSelectOptions[] | [];
  initialValues: {};
}

export const TopicEditForm = (props: IProps) => {
  const classes = useStyles();
  const {
    loading,
    category_options,
    subCategory_options,
    onSubmit,
    initialValues,
  } = props;
  const methods = useForm<ITopicFormFields>({
    resolver: yupResolver(topicFormSchema),
    defaultValues: initialValues,
  });

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
                disabled={loading}
                readOnly
              />
            </Grid>
            <Grid item>
              <FormDropdown
                name="subCategory"
                label="Sub Category"
                disabled={loading}
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
                Edit
              </Button>
            </Grid>
          </form>
        </FormProvider>
      </Grid>
    </>
  );
};
