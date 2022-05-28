import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { TopicEditForm } from "Containers/TopicEditForm";
import { SimpleDrawer } from "Components/Dialog/SimpleDrawer";
import { useTopicEditForm } from "Hooks/useTopicEditForm";

export const TopicEditView = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const {
    loading,
    category_options,
    subCategory_options,
    onSubmit,
    defaultValues,
  } = useTopicEditForm(topicId, categoryId);

  const onClose = () => {
    setOpen(false);
    history.push("/topicList");
  };

  return (
    <>
      {loading ? (
        <p>....loading</p>
      ) : (
        <SimpleDrawer
          open={open}
          title="Edit Topic"
          onClose={onClose}
          submitLabel="Edit">
          <TopicEditForm
            onSubmit={onSubmit}
            category_options={category_options}
            subCategory_options={subCategory_options}
            defaultValues={defaultValues}
            loading={loading}
          />
        </SimpleDrawer>
      )}
    </>
  );
};
