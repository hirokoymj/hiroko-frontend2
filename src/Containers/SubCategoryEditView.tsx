import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { SimpleDrawer } from "Components/Dialog/SimpleDrawer";
import { SubCategoryEditForm } from "./SubCategoryEditForm";
import { useSubCategoryEditForm } from "Hooks/useSubCategoryEditForm";

export const SubCategoryEditView = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(true);
  const { onSubmit, initialValues, loading, category_options } =
    useSubCategoryEditForm(id);

  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/subCategoryList");
  };
  if (!loading) console.log(initialValues);

  return (
    <>
      {loading ? (
        <p>...loading</p>
      ) : (
        <SimpleDrawer
          open={open}
          title="Edit Sub Category"
          onClose={onClose}
          submitLabel="Edit">
          <SubCategoryEditForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            loading={loading}
            category_options={category_options}
          />
        </SimpleDrawer>
      )}
    </>
  );
};
