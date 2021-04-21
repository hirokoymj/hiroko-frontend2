import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import IconButton from "@material-ui/core/IconButton";
import EmailIcon from "@material-ui/icons/Email";
import GitHubIcon from "@material-ui/icons/GitHub";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(2),
    bottom: 0,
    width: "100%",
    color: "#939AA8",
    textAlign: "center",
  },
  icon: {
    color: "#939AA8",
  },
}));

const IconButtonLink = ({ icon, to }) => {
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
    </footer>
  );
};
