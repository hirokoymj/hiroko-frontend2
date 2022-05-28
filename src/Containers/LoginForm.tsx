import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { FormProvider, useForm } from "react-hook-form";
import { useMutation } from "@apollo/react-hooks";
import { useHistory } from "react-router-dom";

import FormTextField from "Components/Inputs/FormTextField";
import { ILoginFormFields } from "Types/forms";
import { loginFormSchema } from "./validation/formValidations";
import { LOGIN_USER } from "Mutations/Login";
import { ILoginVars, IUser } from "Types/api/Login";

const useStyles = makeStyles((theme: Theme) => ({
  button: {
    width: "100%",
  },
}));

export const LoginForm = () => {
  const classes = useStyles();
  const history = useHistory();
  const methods = useForm<ILoginFormFields>({
    resolver: yupResolver(loginFormSchema),
  });
  const [loginUser] = useMutation<IUser, ILoginVars>(LOGIN_USER);

  const onSubmit = async (values: ILoginFormFields) => {
    try {
      await loginUser({
        variables: {
          loginInput: {
            ...values,
          },
        },
      });
      history.push("/logintest");
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
              Login
            </Button>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  );
};
