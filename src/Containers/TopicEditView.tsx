import React, { useState } from "react";
import {
  Field,
  reduxForm,
  InjectedFormProps,
  formValueSelector,
} from "redux-form";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

import { TopicEditFormController } from "Components/FormController/TopicEditFormController";
import { FormTextField } from "Components/Forms/FormTextField";
import { FormSelect } from "Components/Forms/FormSelect";
import { DrawerDialog } from "Components/Dialog/DrawerDialog";
import { TTopicFormData, IFormSelectOptions } from "Types/forms";
import { RootState } from "Redux/ReduxProvider";

interface IProps extends InjectedFormProps<TTopicFormData> {
  category_options: IFormSelectOptions[];
  subCategory_options: IFormSelectOptions[];
  loading: boolean;
  open: boolean;
  onClose: any;
}

const TopicEditFormFields = (props: IProps) => {
  const {
    handleSubmit,
    submitting,
    category_options,
    subCategory_options,
    loading,
    open,
    onClose,
  } = props;
  return (
    <DrawerDialog
      open={open}
      title="Edit Topic"
      onClose={onClose}
      onSubmit={handleSubmit}
      submitting={submitting}
      submitLabel="Edit">
      <>
        <Field
          name="category"
          component={FormSelect}
          fullWidth
          variant="outlined"
          label="Category"
          options={category_options}
          margin="normal"
          disabled={loading}
        />
        <Field
          name="subCategory"
          component={FormSelect}
          fullWidth
          variant="outlined"
          label="Sub Category"
          options={subCategory_options}
          margin="normal"
          disabled={loading}
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
    </DrawerDialog>
  );
};

const TopicEditForm = reduxForm<TTopicFormData, IProps>({
  form: "Topic_Edit_Form",
})(TopicEditFormFields);

interface ITopiEditView {
  categoryId: string;
}

export const TopicEditView = connect((state: RootState) => ({
  categoryId: formValueSelector("Topic_Edit_Form")(state, "category"),
}))((props: ITopiEditView) => {
  const { id } = useParams<{ id: string }>();
  const [open, setOpen] = useState(true);
  const history = useHistory();
  const { categoryId } = props;

  const onClose = () => {
    setOpen(false);
    history.push("/topicList");
  };

  return (
    <div>
      <TopicEditFormController topicId={id} categoryId={categoryId}>
        {(props: any) => (
          <TopicEditForm {...props} open={open} onClose={onClose} />
        )}
      </TopicEditFormController>
    </div>
  );
});
