import React, { useEffect, useState } from "react";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormGroup,
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
  defaultValue: any;
}

export const FormInputMultiCheckbox: React.FC<FormInputProps> = ({
  name,
  label,
  options,
  defaultValue,
}) => {
  const [selectedItems, setSelectedItems] = useState<any>(defaultValue);
  const {
    control,
    formState: { errors, isSubmitSuccessful },
    setValue,
    getValues,
  } = useFormContext();

  const handleSelect = (value: any) => {
    const selected = getValues()[name];
    console.log(selected);

    const isPresent = selectedItems.indexOf(value);
    if (isPresent !== -1) {
      const remaining = selectedItems.filter((item: any) => item !== value);
      setSelectedItems(remaining);
    } else {
      setSelectedItems((prevItems: any) => [...prevItems, value]);
    }
  };

  useEffect(() => {
    setValue(name, selectedItems);
    if (isSubmitSuccessful) {
      setSelectedItems([]);
    }
  }, [selectedItems, isSubmitSuccessful]);

  return (
    <FormControl
      size={"small"}
      variant={"outlined"}
      error={errors && errors[name]}>
      <FormLabel component="legend">{label}</FormLabel>
      <FormGroup row>
        {options.map((option) => {
          return (
            <FormControlLabel
              control={
                <Controller
                  name={name}
                  render={({ field }) => {
                    return (
                      <Checkbox
                        onChange={() =>
                          field.onChange(handleSelect(option.value))
                        }
                        checked={selectedItems.includes(option.value)}
                      />
                    );
                  }}
                  control={control}
                />
              }
              label={option.label}
              key={option.value}
            />
          );
        })}
      </FormGroup>
      <FormHelperText>{errors && errors[name]?.message}</FormHelperText>
    </FormControl>
  );
};
