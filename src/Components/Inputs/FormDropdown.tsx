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
}

const FormDropdown: FC<IFormDropdownFieldProps> = ({
  label,
  name,
  options,
  disabled,
}: IFormDropdownFieldProps) => {
  const {
    register,
    formState: { errors },
    getValues,
  } = useFormContext();

  const selected = getValues(name);
  console.log("FormDropdown");
  console.log(selected);

  return (
    <FormControl variant="outlined" fullWidth error={!!errors[name]}>
      <InputLabel htmlFor="age-helper">{label}</InputLabel>
      <Select
        {...register(name)}
        disabled={disabled && disabled}
        defaultValue={selected}>
        {/* <MenuItem key="0" value="">
          Select menu
        </MenuItem> */}
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
