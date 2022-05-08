import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  FormHelperText,
} from "@material-ui/core";
import { useFormContext, Controller } from "react-hook-form";

interface option {
  label: string;
  value: string | number;
}

interface FormInputProps {
  name: string;
  label: string;
  options: option[];
  disabled?: boolean;
  handleChange?: (value: any) => void;
  readOnly?: boolean;
}

export const FormInputDropdown: React.FC<FormInputProps> = ({
  name,
  label,
  options,
  disabled,
  handleChange,
  readOnly,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormControl error={errors && !!errors[name]} fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Controller
        render={({ field }) => (
          <Select
            {...field}
            onChange={(e) => {
              field.onChange(e);
              handleChange && handleChange(e);
            }}
            value={field.value}
            labelId={name}
            variant="outlined"
            disabled={disabled}
            inputProps={{ readOnly: readOnly ? true : false }}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        )}
        control={control}
        name={name}
      />
      <FormHelperText>{errors && errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};
