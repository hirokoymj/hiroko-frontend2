import { useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import { SimpleDrawer } from "Components/Dialog/SimpleDrawer";
import { CategoryEditForm } from "./CategoryEditForm";
import { useCategoryEditForm } from "Hooks/useCategoryEditForm";

export const CategoryEditView = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(true);
  const history = useHistory();
  const { onSubmit, initialValues, loading } = useCategoryEditForm(id);

  const onClose = () => {
    setOpen(false);
    history.push("/categoryList");
  };

  return (
    <div>
      {loading ? (
        <p>...loading</p>
      ) : (
        <SimpleDrawer
          open={open}
          title="Edit Category"
          onClose={onClose}
          submitLabel="Edit">
          <CategoryEditForm
            onSubmit={onSubmit}
            initialValues={initialValues}
            loading={loading}
          />
        </SimpleDrawer>
      )}
    </div>
  );
};
