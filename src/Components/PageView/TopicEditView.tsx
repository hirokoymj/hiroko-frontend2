import React, { useState } from "react";
import {
  Field,
  formValues,
  reduxForm,
  InjectedFormProps,
  formValueSelector,
} from "redux-form";
import { compose } from "recompose";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { TopicEditFormController } from "Components/FormController/TopicEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { DashboardLayout } from "Components/Layouts/DashboardLayout";
import { FormSkeleton } from "Components/Skeleton/FormSkeleton";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { TTopicFormData } from "Types/forms";
import { RootState } from "Redux/ReduxProvider";

interface IProps extends InjectedFormProps<TTopicFormData> {
  category_options: [];
  subCategory_options: [];
  loading: boolean;
  open: boolean;
  onClose: any;
  categoryId: string;
}

const mapStateToProps = (state: RootState) => ({
  categoryId: formValueSelector("Topic_Edit_Form")(state, "category"),
});

const TopicEditFormFields = reduxForm<TTopicFormData, IProps>({
  form: "Topic_Edit_Form",
})((props) => {
  const {
    handleSubmit,
    submitting,
    category_options,
    subCategory_options,
    loading,
    open,
    onClose,
    categoryId,
  } = props;
  return (
    <DrawerDialog
      open={open}
      title="Edit Topic"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Edit">
      {loading ? (
        <FormSkeleton fieldCount={4} />
      ) : (
        <>
          <Field
            name="category"
            component={FormSelect}
            fullWidth
            variant="outlined"
            label="Category"
            options={category_options}
            margin="normal"
          />
          <Field
            name="subCategory"
            component={FormSelect}
            fullWidth
            variant="outlined"
            label="Sub Category"
            options={subCategory_options.filter(
              (option: any) => option.categoryId === categoryId
            )}
            margin="normal"
          />
          <Field
            name="title"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="Title"
            margin="normal"
          />
          <Field
            name="url"
            component={FormTextField}
            fullWidth
            variant="outlined"
            label="URL"
            margin="normal"
          />
        </>
      )}
    </DrawerDialog>
  );
});

const TopicEditFormDrawer = connect(mapStateToProps, null)(TopicEditFormFields);

export const TopicEditView = () => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(true);
  const history = useHistory();

  const onClose = () => {
    setOpen(false);
    history.push("/categoryList");
  };

  return (
    <DashboardLayout title="Topic">
      <TopicEditFormController topicId={id}>
        {(props: any) => (
          <TopicEditFormDrawer {...props} open={open} onClose={onClose} />
        )}
      </TopicEditFormController>
    </DashboardLayout>
  );
};
