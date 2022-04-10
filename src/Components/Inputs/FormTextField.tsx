import React, { FC } from "react";
import { TextField } from "@material-ui/core";
import { useFormContext } from "react-hook-form";

interface IFormTextFieldProps {
  label: string;
  name: string;
}

const FormTextField: FC<IFormTextFieldProps> = ({
  label,
  name,
}: IFormTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <TextField
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message ?? ""}
      fullWidth
      margin="dense"
      defaultValue=""
      {...register(name)}
    />
  );
};

export default FormTextField;
