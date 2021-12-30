import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from "@material-ui/icons/GitHub";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import AssignmentIcon from "@material-ui/icons/Assignment";
import { makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    padding: theme.spacing(2),
    bottom: 0,
    width: "100%",
    color: "#939AA8",
    textAlign: "center",
  },
  icon: {
    color: "#939AA8",
    "&:hover": {
      color: theme.palette.secondary.dark,
      backgroundColor: theme.palette.accent.main,
    },
  },
}));

type IconButtonLinkProps = {
  icon: React.ReactNode;
  to: string;
};
const IconButtonLink = ({ icon, to }: IconButtonLinkProps) => {
  const classes = useStyles();

  return (
    <Link href={to} color="inherit" target="_blank" rel="noreferrer">
      <IconButton className={classes.icon}>{icon}</IconButton>
    </Link>
  );
};

export const PageFooter = () => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} hirokoymj.com All rights reserved.
      </Typography>
      <IconButtonLink
        icon={<EmailIcon fontSize="large" />}
        to="mailto:hiroko@hirokoymj.com"
      />
      <IconButtonLink
        icon={<GitHubIcon fontSize="large" />}
        to="https://github.com/hirokoymj/hiroko-frontend"
      />
      <IconButtonLink
        icon={<AssignmentIcon fontSize="large" />}
        to="/Hiroko_Yamaji_Resume.pdf"
      />
    </footer>
  );
};
