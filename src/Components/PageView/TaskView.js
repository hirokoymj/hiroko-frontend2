import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useMutation } from "@apollo/react-hooks";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { TaskTable } from "Components/Tables/TaskTable";

export const TaskView = () => {
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <h1>Task View</h1>
          <Paper>
            <TaskTable />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};
