import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import { RegisterForm } from "./RegisterForm";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";

export const RegisterView = () => {
  return (
    <DashboardLayout title="Register">
      <Grid container spacing={3} justify="center">
        <Grid item xs={12} md={8}>
          <Paper>
            <RegisterForm />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
