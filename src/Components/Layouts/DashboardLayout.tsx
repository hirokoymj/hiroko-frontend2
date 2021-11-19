import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { connect } from "react-redux";
import { setTitle } from "Redux/Title/ActionCreator";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex",
    "& .MuiFormControl-root": {
      marginBottom: theme.spacing(2),
    },
    "& .MuiPaper-root": {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "auto",
      flexDirection: "column",
    },
    "& .MuiTableCell-head": {
      fontWeight: 600,
    },
  },
  container: {
    padding: (props: any) =>
      props.fullWidth ? "0 !important" : theme.spacing(4),
    maxWidth: (props: any) => props.fullWidth && "100%",
    [theme.breakpoints.down("sm")]: {
      padding: "16px !important",
    },
  },
}));

const mapDispatchToProps = {
  setTitle,
};

type Props = typeof mapDispatchToProps & {
  children: any;
  maxWidth?: "lg" | "xs" | "sm" | "md" | "xl";
  fullWidth?: boolean;
  title?: string;
};
type StyleProps = Pick<Props, "fullWidth">;

const DashboardLayoutController = (props: Props) => {
  const { setTitle, children, maxWidth, fullWidth, title } = props;
  const classes = useStyles({ fullWidth });

  useEffect(() => {
    setTitle(title);
  }, [setTitle, title]);

  return (
    <div className={classes.root}>
      <Container
        maxWidth={maxWidth ? maxWidth : "lg"}
        className={classes.container}>
        {children}
      </Container>
    </div>
  );
};

export const DashboardLayout = connect(
  null,
  mapDispatchToProps
)(DashboardLayoutController);
