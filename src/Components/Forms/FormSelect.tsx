import React from "react";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import MenuItem from "@material-ui/core/MenuItem";
import { WrappedFieldProps } from "redux-form";
import { IFormSelectOptions } from "Types/forms";

type Props = WrappedFieldProps & {
  label: string;
  options: [];
  variant: "filled" | "outlined" | "standard";
  margin: "dense" | "none" | "normal";
  disabled: boolean;
};

export const FormSelect = ({
  input,
  label,
  meta: { touched, error },
  options,
  variant,
  margin,
  disabled,
  ...custom
}: any) => {
  return (
    <FormControl
      error={touched && error}
      fullWidth
      variant={variant}
      margin={margin && margin}>
      <InputLabel id={input.name}>{label}</InputLabel>
      <Select
        labelId={input.name}
        value={input.value}
        onChange={input.onChange}
        inputProps={{
          name: input.name,
          id: input.name,
          onBlur: input.onBlur,
        }}
        label={label}
        disabled={disabled && disabled}
        {...custom}>
        {options.map(({ value, label }: IFormSelectOptions) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {touched && error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
};
