import React from "react";
import PropTypes from "prop-types";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";

export const ListItemLink = (props) => {
  const { icon, text, to, title } = props;

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
        <ListItemIcon>{icon}</ListItemIcon>
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