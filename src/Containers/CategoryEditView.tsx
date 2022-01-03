import React, { useState } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { useParams, useHistory } from "react-router-dom";

import { CategoryEditFormController } from "Components/FormController/CategoryEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { ICategoryFormData } from "Types/forms";

interface IProps extends InjectedFormProps<ICategoryFormData> {
  loading: boolean;
  open: boolean;
  onClose: any;
}

const CategoryEditFormFields = (props: IProps) => {
  const { handleSubmit, submitting, loading, open, onClose } = props;
  return (
    <DrawerDialog
      open={open}
      title="Edit Category"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Edit">
      {loading ? (
        <FormSkeleton fieldCount={2} />
      ) : (
        <>
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
        </>
      )}
    </DrawerDialog>
  );
};

const CategoryEditFormDrawer = reduxForm<ICategoryFormData, IProps>({
  form: "Category_Edit_Form",
})(CategoryEditFormFields);

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
      <CategoryEditFormController categoryId={id}>
        {(props: any) => (
          <CategoryEditFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </CategoryEditFormController>
    </div>
  );
};
