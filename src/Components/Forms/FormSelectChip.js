import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  root: {
    margin: 2,
  },
  colorSecondary: {
    color: "#fff",
  },
  deleteIcon: {
    color: "#c8e6c9",
  },
  formControl: {
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    width: "60%",
  },
}));

/*
 * 1. A filter option is an array of object. - [{name: xxx, value: xxx}]
 * 2. A filter state is just an array, NOT array-of-object. - [123, 456, 789]
 */
export const FormSelectChip = ({
  filters,
  selectedFilters,
  handleFilterChange,
  handleDeleteFilter,
  filterLabel = "Filter",
}) => {
  const classes = useStyles();

  return (
    <FormControl className={classes.formControl}>
      <InputLabel>{filterLabel}</InputLabel>
      <Select
        name="tableFilter"
        multiple
        value={selectedFilters}
        onChange={handleFilterChange}
        onMouseDown={(event) => event.stopPropagation()}
        input={<Input />}
        renderValue={(selected) => (
          <div className={classes.chips}>
            {selected.map((value) => {
              return (
                <Chip
                  key={value}
                  label={filters.find((d) => d.value === value).name}
                  onDelete={handleDeleteFilter(value)}
                  onMouseDown={(event) => event.stopPropagation()}
                  classes={{
                    root: classes.root,
                    colorSecondary: classes.colorSecondary,
                    deleteIcon: classes.deleteIcon,
                  }}
                  color="secondary"
                />
              );
            })}
          </div>
        )}>
        {filters.map(({ name, value }) => {
          return (
            <MenuItem key={value} value={value}>
              <Checkbox checked={selectedFilters.indexOf(value) > -1} />
              <ListItemText primary={name} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
