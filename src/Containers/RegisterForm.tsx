import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { useSnackbar } from "notistack";

import FormTextField from "Components/Inputs/FormTextField";
import { IRegisterFormFields } from "Types/forms";
import { registerFormSchema } from "./validation/formValidations";
import { REGISTER_USER } from "Mutations/Login";
import { IRegisterVars, IUser } from "Types/api/Login";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
  },
}));

export const RegisterForm = () => {
  const classes = useStyles();
  const methods = useForm<IRegisterFormFields>({
    resolver: yupResolver(registerFormSchema),
  });
  const { enqueueSnackbar } = useSnackbar();
  const [registerUser] = useMutation<IUser, IRegisterVars>(REGISTER_USER);

  const onSubmit = async (values: IRegisterFormFields) => {
    try {
      await registerUser({
        variables: {
          registerInput: {
            ...values,
          },
        },
      });
      enqueueSnackbar("New user has been created!", {
        variant: "success",
      });
      methods.reset();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Grid container>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          style={{ width: "100%" }}>
          <Grid item xs={12}>
            <FormTextField label="username" name="username" />
          </Grid>
          <Grid item>
            <FormTextField label="email" name="email" />
          </Grid>
          <Grid item>
            <FormTextField label="password" name="password" />
          </Grid>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}>
              Register
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
