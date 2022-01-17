import React from "react";
import TextField from "@material-ui/core/TextField";
import { WrappedFieldProps } from "redux-form";

type IFormTextFieldProps = WrappedFieldProps & { label: string; type: string };

export const FormTextField = ({
  label,
  input,
  meta: { touched, invalid, error },
  type,
  ...custom
}: IFormTextFieldProps) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    type={type ? type : "string"}
    {...input}
    {...custom}
  />
);
