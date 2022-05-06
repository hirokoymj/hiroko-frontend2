import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import TextField from "@material-ui/core/TextField";

interface FormInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
}

export const FormInputText = ({
  name,
  label,
  type,
  placeholder,
}: FormInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          helperText={error ? error.message : null}
          error={!!error}
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          type={type ? type : "text"}
          placeholder={placeholder || placeholder}
        />
      )}
    />
  );
};
