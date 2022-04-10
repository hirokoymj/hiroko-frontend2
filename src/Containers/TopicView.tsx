import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { useSnackbar } from "notistack";
import { Route, Switch } from "react-router-dom";
import { useSelector } from "react-redux";

import { TopicFormController } from "Components/FormController/TopicFormController";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { TopicTable } from "Components/Tables/TopicTable";
import { AlertDialog } from "Components/Dialog/AlertDialog";
import { DELETE_TOPIC } from "Mutations/Topic";
import { TOPICS } from "Queries/Topic";
import { TopicEditView } from "Containers/TopicEditView";
import { IDeleteTopicVars, ITopic } from "Types/api/Topic";
import { RootState } from "Redux/ReduxProvider";
import { TopicForm } from "Containers/TopicForm";

export const TopicView = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState<boolean>(false);
  const [topicId, setTopicId] = useState<string>("");
  const selectedFilters = useSelector(
    (state: RootState) => state.categoryFilter.value
  );
  const [deleteTopic, { loading }] = useMutation<ITopic, IDeleteTopicVars>(
    DELETE_TOPIC,
    {
      refetchQueries: [
        {
          query: TOPICS,
          variables: {
            limit: 10,
            cursor: null,
            ...(selectedFilters.length !== 0 && {
              filter: selectedFilters,
            }),
          },
          fetchPolicy: "network-only",
        },
      ],
    }
  );

  const handleClose = () => setOpen(false);

  const handleOpen = (id: string) => {
    setTopicId(id);
    setOpen(true);
  };

  const handleDeleteTopic = async () => {
    try {
      await deleteTopic({
        variables: {
          id: topicId,
        },
      });
      enqueueSnackbar("Topic successfully deleted!", {
        variant: "success",
      });
      handleClose();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Switch>
        <Route path={`/topicList/:id`} component={TopicEditView} />
      </Switch>
      <DashboardLayout title="Technical Topics">
        <Grid container spacing={3} justify="center">
          <Grid item xs={12} md={6}>
            <Paper>
              <TopicFormController>
                {(props: any) => <TopicForm {...props} />}
              </TopicFormController>
            </Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper>
              <TopicTable openDialog={handleOpen} />
            </Paper>
          </Grid>
        </Grid>
        <AlertDialog
          open={open}
          onClose={handleClose}
          title="Delete Topic"
          content={
            <>
              <Typography component="p" variant="body1">
                Do you want to to delete a topic?
              </Typography>
            </>
          }
          actionLabel={loading ? "Deleting" : "Delete"}
          action={handleDeleteTopic}
          cancelLabel="Cancel"
          cancel={handleClose}
        />
      </DashboardLayout>
    </>
  );
};
