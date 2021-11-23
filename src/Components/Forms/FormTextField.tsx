import React from "react";
import TextField from "@material-ui/core/TextField";
import { WrappedFieldProps } from "redux-form";

type IFormTextFieldProps = WrappedFieldProps & { label: string };

export const FormTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  ...custom
}: IFormTextFieldProps) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);
