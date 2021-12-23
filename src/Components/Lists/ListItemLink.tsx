import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: "rgba(0, 0, 0, 0.8)",
    minWidth: "40px",
  },
  listButton: {
    "&:hover": {
      backgroundColor: theme.palette.accent.main,
    },
  },
}));

type Props = {
  icon: React.ReactNode;
  text: string;
  to: string;
};
export const ListItemLink = (props: Props) => {
  const { icon, text, to } = props;
  const classes = useStyles();

  const renderLink = React.useMemo(
    () =>
      React.forwardRef<HTMLAnchorElement>((itemProps, ref) => (
        <RouterLink to={to} {...itemProps} ref={ref} />
      )),
    [to]
  );

  return (
    <ListItem
      button
      component={renderLink}
      classes={{ root: classes.listButton }}>
      <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
};
