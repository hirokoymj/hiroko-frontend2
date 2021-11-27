import React from "react";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) => ({
  iconButtonRoot: {
    backgroundColor: theme.palette.secondary.dark,
    padding: theme.spacing(1),
    margin: theme.spacing(0, 1),
    "&:hover": {
      backgroundColor: theme.palette.secondary.light,
    },
  },
  svgIconRoot: {
    color: theme.palette.common.white,
    fontSize: "1.3rem",
    textAlign: "center",
    fontWeight: 400,
  },
}));

type TMouseEvent = React.MouseEvent<HTMLButtonElement>;

type Props = {
  icon: string;
  onClick?: any;
  action?: any;
  onOpen?: any;
};

export const ActionLinkButton = ({ icon, onClick, onOpen }: Props) => {
  const classes = useStyles();

  return (
    // <Link href="#"  onClick={() => onClick}>
    //   <IconButton classes={{ root: classes.iconButtonRoot }}>
    //     <Icon classes={{ root: classes.svgIconRoot }}>{icon}</Icon>
    //   </IconButton>
    // </Link>
    <IconButton classes={{ root: classes.iconButtonRoot }} onClick={onOpen}>
      <Icon classes={{ root: classes.svgIconRoot }}>{icon}</Icon>
    </IconButton>
  );
};

// export const ActionButton = ({ icon, action }: Props) => {
//   const classes = useStyles();

//   return (
//     <IconButton classes={{ root: classes.iconButtonRoot }} onClick={action}>
//       <Icon classes={{ root: classes.svgIconRoot }}>{icon}</Icon>
//     </IconButton>
//   );
// };
