import IconButton from "@material-ui/core/IconButton";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

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

interface IProps {
  icon: string;
  onClick: () => void;
}

export const ActionButton = ({ icon, onClick }: IProps) => {
  const classes = useStyles();

  return (
    <IconButton classes={{ root: classes.iconButtonRoot }} onClick={onClick}>
      <Icon classes={{ root: classes.svgIconRoot }}>{icon}</Icon>
    </IconButton>
  );
};
