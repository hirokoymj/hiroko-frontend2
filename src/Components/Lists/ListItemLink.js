import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  imageIcon: {
    width: "23px",
    height: "auto",
    backgroundColor: "transparent !important",
  },
  icon: {
    color: "rgba(0, 0, 0, 0.8)",
  },
}));

export const ListItemLink = (props) => {
  const { icon, text, to, title, imageIcon } = props;
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink
          to={{ pathname: to, state: { title: title } }}
          ref={ref}
          {...itemProps}
        />
      )),
    [to, title]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon && <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>}
        {imageIcon && (
          <ListItemIcon>
            <img src={imageIcon} alt="" className={classes.imageIcon} />
          </ListItemIcon>
        )}
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};
