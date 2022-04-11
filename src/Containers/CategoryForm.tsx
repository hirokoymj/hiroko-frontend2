import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";

import FormTextField from "Components/Inputs/FormTextField";
import { ICategoryFormFields } from "Types/forms";
import { categoryFormSchema } from "./validation/formValidations";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
  },
}));

interface IProps {
  onSubmit: () => void;
}
export const CategoryForm = (props: IProps) => {
  const { onSubmit } = props;
  const classes = useStyles();
  const methods = useForm<ICategoryFormFields>({
    resolver: yupResolver(categoryFormSchema),
  });

  return (
    <Grid container>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: "100%" }}>
          <Grid item xs={12}>
            <FormTextField label="Name" name="name" />
          </Grid>
          <Grid item>
            <FormTextField label="Abbreviation" name="abbr" />
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
