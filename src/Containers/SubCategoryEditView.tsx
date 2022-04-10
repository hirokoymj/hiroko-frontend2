import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { SubCategoryEditFormController } from "Components/FormController/SubCategoryEditFormController";
import { SimpleDrawer } from "Components/Dialog/SimpleDrawer";
import { SubCategoryEditForm } from "./SubCategoryEditForm";

export const SubCategoryEditView = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/subCategoryList");
  };

  return (
    <SimpleDrawer
      open={open}
      title="Edit Sub Category"
      onClose={onClose}
      submitLabel="Edit">
      {
        <SubCategoryEditFormController subCategoryId={id}>
          {(props: any) => !props.loading && <SubCategoryEditForm {...props} />}
        </SubCategoryEditFormController>
      }
    </SimpleDrawer>
  );
};
