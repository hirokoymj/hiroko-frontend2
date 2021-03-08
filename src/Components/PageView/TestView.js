import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import ListItemText from "@material-ui/core/ListItemText";
import Select from "@material-ui/core/Select";
import Checkbox from "@material-ui/core/Checkbox";
import Chip from "@material-ui/core/Chip";
import { CATEGORY_ALL } from "Queries/Category";
import { useQuery } from "@apollo/react-hooks";
import get from "lodash/get";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },
  root: {
    margin: 2,
  },
  noLabel: {
    marginTop: theme.spacing(3),
  },
  colorSecondary: {
    color: "#fff",
  },
  deleteIcon: {
    color: "#c8e6c9",
  },
}));

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export const TestView = () => {
  const classes = useStyles();
  const [categoryFilter, setCategoryFilter] = React.useState([]);
  const { data, loading } = useQuery(CATEGORY_ALL);

  const categories = !loading && get(data, "categoryAll");
  const filters =
    !loading &&
    categories.map(({ name, id }) => {
      return {
        name,
        id,
      };
    });

  const handleChange = (event) => {
    console.log("handleChange");
    console.log(event.target.value);
    setCategoryFilter(event.target.value);
  };

  const handleDeleteFilter = (value) => () => {
    console.log(value);
    setCategoryFilter((chips) => {
      const result = chips.filter((chip) => chip !== value);
      return result;
    });
  };

  return (
    <div>
      {loading ? (
        <h1>...loading</h1>
      ) : (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel>Chip</InputLabel>
            <Select
              name="categoryFilter"
              multiple
              value={categoryFilter}
              onChange={handleChange}
              onMouseDown={(event) => event.stopPropagation()}
              input={<Input />}
              renderValue={(selected) => (
                <div className={classes.chips}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={filters.find((d) => d.id === value).name}
                      onDelete={handleDeleteFilter(value)}
                      onMouseDown={(event) => event.stopPropagation()}
                      classes={{
                        root: classes.root,
                        colorSecondary: classes.colorSecondary,
                        deleteIcon: classes.deleteIcon,
                      }}
                      color="secondary"
                    />
                  ))}
                </div>
              )}
              MenuProps={MenuProps}>
              {filters.map(({ name, id }) => {
                return (
                  <MenuItem key={id} value={id}>
                    <Checkbox checked={categoryFilter.indexOf(id) > -1} />
                    <ListItemText primary={name} />
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </>
      )}
    </div>
  );
};
