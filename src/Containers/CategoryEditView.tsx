import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { CategoryEditFormController } from "Components/FormController/CategoryEditFormController";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
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
      <DrawerDialog
        open={open}
        title="Edit Category"
        onClose={onClose}
        submitLabel="Edit">
        {
          <CategoryEditFormController categoryId={id}>
            {(props: any) =>
              !props.loading && (
                <DrawerDialog
                  open={open}
                  title="Edit Category"
                  onClose={onClose}
                  submitLabel="Edit">
                  <CategoryEditForm
                    onSubmit={props.onSubmit}
                    initialValues={props.initialValues}
                  />
                </DrawerDialog>
              )
            }
          </CategoryEditFormController>
        }
      </DrawerDialog>
    </div>
  );
};
