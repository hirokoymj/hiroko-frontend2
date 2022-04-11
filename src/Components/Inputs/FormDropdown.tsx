import React, { FC } from "react";
import {
  FormControl,
  MenuItem,
  FormHelperText,
  InputLabel,
  Select,
} from "@material-ui/core";
import { useFormContext } from "react-hook-form";

type option = {
  value: any;
  label: string;
};
interface IFormDropdownFieldProps {
  label: string;
  name: string;
  options: option[];
  disabled?: boolean;
  defaultValue?: any;
  onChange?: (e: any) => void;
  readOnly?: boolean;
}

const FormDropdown: FC<IFormDropdownFieldProps> = ({
  label,
  name,
  options,
  disabled,
  onChange,
  readOnly,
}: IFormDropdownFieldProps) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const selected = getValues(name);

  return (
    <FormControl variant="outlined" fullWidth error={!!errors[name]}>
      <InputLabel htmlFor="age-helper">{label}</InputLabel>
      <Select
        {...register(name)}
        disabled={disabled && disabled}
        defaultValue={selected}
        readOnly={readOnly}
        onChange={onChange && onChange}>
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{errors[name]?.message ?? ""}</FormHelperText>
    </FormControl>
  );
};

export default FormDropdown;
