import React from "react";
import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  FormHelperText,
} from "@material-ui/core";
import { Controller, useFormContext } from "react-hook-form";

interface option {
  label: string;
  value: string | number;
}

interface FormInputProps {
  name: string;
  label: string;
  options: option[];
}

export const FormInputRadio: React.FC<FormInputProps> = ({
  name,
  label,
  options,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <FormControl component="fieldset" error={errors && !!errors[name]}>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <RadioGroup row value={value} onChange={onChange}>
            {options.map((option) => {
              return (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  label={option.label}
                  control={<Radio />}
                />
              );
            })}
          </RadioGroup>
        )}
      />
      <FormHelperText>{errors ? errors[name]?.message : ""}</FormHelperText>
    </FormControl>
  );
};
