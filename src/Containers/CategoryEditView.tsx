import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { CategoryEditFormController } from "Components/FormController/CategoryEditFormController";
import { SimpleDrawer } from "Components/Dialog/SimpleDrawer";
import { CategoryEditForm } from "./CategoryEditForm";

export const CategoryEditView = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/categoryList");
  };

  return (
    <div>
      <SimpleDrawer
        open={open}
        title="Edit Category"
        onClose={onClose}
        submitLabel="Edit">
        {
          <CategoryEditFormController categoryId={id}>
            {(props: any) =>
              !props.loading && (
                <CategoryEditForm
                  onSubmit={props.onSubmit}
                  initialValues={props.initialValues}
                />
              )
            }
          </CategoryEditFormController>
        }
      </SimpleDrawer>
    </div>
  );
};
