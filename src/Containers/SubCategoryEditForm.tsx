import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import FormTextField from "Components/Inputs/FormTextField";
import { ISubCategoryFormFields } from "Types/forms";
import FormDropdown from "Components/Inputs/FormDropdown";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
  },
}));

const formSchema = yup.object().shape({
  categoryId: yup.string().required(),
  name: yup.string().required("Sub Category name is required"),
  order: yup.string().optional(),
});

type dropdownOption = {
  label: string;
  value: string;
};
interface IProps {
  onSubmit: () => void;
  category_options: dropdownOption[];
  loading: boolean;
  initialValues: any;
}
export const SubCategoryEditForm = (props: IProps) => {
  const classes = useStyles();
  const methods = useForm<ISubCategoryFormFields>({
    resolver: yupResolver(formSchema),
    defaultValues: props.initialValues,
  });

  return (
    <Grid container>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(props.onSubmit)}
          style={{ width: "100%" }}>
          <Grid item>
            <FormDropdown
              name="categoryId"
              label="Category"
              options={props.category_options}
            />
          </Grid>
          <Grid item>
            <FormTextField label="Sub Category Name" name="name" />
          </Grid>
          <Grid item>
            <FormTextField label="Order" name="order" type="number" />
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
  );
};
