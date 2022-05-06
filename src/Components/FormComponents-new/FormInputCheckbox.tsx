import React from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
  FormHelperText,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

interface FormInputProps {
  name: string;
  label: string;
  formLabel: string;
}

export const FormInputCheckbox: React.FC<FormInputProps> = ({
  name,
  label,
  formLabel,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl
      size={"small"}
      variant={"outlined"}
      error={errors && errors[name]}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        <FormControlLabel
          control={
            <Controller
              name={name}
              render={({ field }) => {
                return (
                  <Checkbox
                    onChange={(e) => field.onChange(e.target.checked)}
                    checked={field.value}
                  />
                );
              }}
              control={control}
            />
          }
          label={formLabel}
        />
      </FormGroup>
      <FormHelperText>{errors && errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};
