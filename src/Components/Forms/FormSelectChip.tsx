import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import { ITableFilterOption } from "Types/common";

const useStyles = makeStyles((theme) => ({
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
  chipRoot: {
    marginRight: theme.spacing(1),
  },
}));

type Props = {
  filters: ITableFilterOption[];
  handleFilterChange: (event: any) => void;
  handleDeleteFilter: (value: string) => any;
  selectedFilters: string[];
  filterLabel: string;
};

export const FormSelectChip = ({
  filters,
  handleFilterChange,
  handleDeleteFilter,
  selectedFilters = [],
  filterLabel = "Filter",
}: Props) => {
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
        renderValue={(selected: any) => (
          <div>
            {selected.map((value: string) => {
              const found = filters.find((d) => d.value === value);
              return (
                <Chip
                  key={value}
                  label={found ? found.name : ""}
                  onDelete={handleDeleteFilter(value)}
                  onMouseDown={(event: any) => event.stopPropagation()}
                  color="primary"
                  classes={{ root: classes.chipRoot }}
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
