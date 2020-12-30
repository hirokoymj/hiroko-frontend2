import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { useParams, useHistory } from "react-router-dom";

import { CategoryEditFormController } from "Components/FormController/CategoryEditFormController";
import { FormTextField } from "../Forms/FormTextField";
import { FormSkelton } from "Components/Skelton/FormSkelton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";

const CategoryEditFormDrawer = reduxForm({
  form: "Category_Edit_Form",
})(({ handleSubmit, submitting, loading, open, onClose }) => {
  return (
    <>
      {loading ? (
        <FormSkelton fieldCount={2} />
      ) : (
        <DrawerDialog
          open={open}
          title="Edit Category"
          onClose={onClose}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Edit"
        >
          <Field
            name="name"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Category Name"
            margin="normal"
          />
          <Field
            name="abbr"
            component={FormTextField}
            type="text"
            fullWidth
            variant="outlined"
            label="Abbreviation"
            margin="normal"
          />
        </DrawerDialog>
      )}
    </>
  );
});

export const CategoryEditView = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/categoryList");
  };

  return (
    <CategoryEditFormController categoryId={id}>
      {(props) => (
        <CategoryEditFormDrawer {...props} open={open} onClose={onClose} />
      )}
    </CategoryEditFormController>
  );
};
