import React, { useState } from "react";
import { Field, reduxForm, InjectedFormProps } from "redux-form";
import { useParams, useHistory } from "react-router-dom";

import { SubCategoryEditFormController } from "Components/FormController/SubCategoryEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { TSubCategoryFormData } from "Types/forms";

interface IProps extends InjectedFormProps<TSubCategoryFormData> {
  loading: boolean;
  open: boolean;
  onClose: any;
  category_options: [];
}
const SubCategoryEditFormDrawer = reduxForm<TSubCategoryFormData, IProps>({
  form: "Sub_Category_Edit_Form",
})((props: IProps) => {
  const { handleSubmit, submitting, category_options, loading, open, onClose } =
    props;

  return (
    <DrawerDialog
      open={open}
      title="Edit Sub Category"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Edit">
      {loading ? (
        <FormSkeleton fieldCount={3} />
      ) : (
        <>
          <Field
            name="categoryId"
            component={FormSelect}
            fullWidth
            variant="outlined"
            label="Category"
            placeholder="Select Category"
            options={category_options}
            margin="normal"
          />
          <Field
            name="name"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Sub Category Name"
            margin="normal"
          />
          <Field
            name="order"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Order"
            margin="normal"
            type="number"
            style={{ width: "45%" }}
          />
        </>
      )}
    </DrawerDialog>
  );
});

export const SubCategoryEditView = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState<boolean>(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/subCategoryList");
  };

  return (
    <div>
      <SubCategoryEditFormController subCategoryId={id}>
        {(props: any) => (
          <SubCategoryEditFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </SubCategoryEditFormController>
    </div>
  );
};
