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
    <li>
      <ListItem button component={renderLink}>
        <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    </li>
  );
};

// export const ListLink = ({ icon, text, to }) => {
//   const classes = useStyles();
//   const preventDefault = (event) => event.preventDefault();

//   return (
//     <ListItem>
//       <Link href={to} onClick={preventDefault}>
//         <ListItemIcon className={classes.icon}>{icon}</ListItemIcon>
//         <ListItemText primary={text} />
//       </Link>
//     </ListItem>
//   );
// };

// ListItemLink.propTypes = {
//   icon: PropTypes.element,
//   text: PropTypes.string.isRequired,
//   to: PropTypes.string.isRequired,
// };
