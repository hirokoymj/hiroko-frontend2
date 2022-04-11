import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { TopicEditFormController } from "Components/FormController/TopicEditFormController";
import { TopicEditForm } from "Containers/TopicEditForm";
import { SimpleDrawer } from "Components/Dialog/SimpleDrawer";

export const TopicEditView = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/topicList");
  };

  return (
    <SimpleDrawer
      open={open}
      title="Edit Topic"
      onClose={onClose}
      submitLabel="Edit">
      <TopicEditFormController topicId={topicId} categoryId={categoryId}>
        {(props: any) =>
          props.loading ? <p>...loading</p> : <TopicEditForm {...props} />
        }
      </TopicEditFormController>
    </SimpleDrawer>
  );
};
