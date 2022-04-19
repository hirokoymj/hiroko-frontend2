import { LoginForm } from "./LoginForm";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

export const LoginView = () => {
  return (
    <DashboardLayout title="Login">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={8}>
          <Paper>
            <LoginForm />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
