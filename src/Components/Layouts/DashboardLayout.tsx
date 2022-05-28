import React, { useEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { setTitle } from "Redux/Title/titleSlice";
import { useDispatch } from "react-redux";

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

interface IProps {
  children: any;
  maxWidth?: "lg" | "xs" | "sm" | "md" | "xl";
  fullWidth?: boolean;
  title: string;
}

export const DashboardLayout = (props: IProps) => {
  const { children, maxWidth, fullWidth, title } = props;
  const dispatch = useDispatch();

  const classes = useStyles({ fullWidth });
  useEffect(() => {
    if (title) {
      dispatch(setTitle(title));
    }
  }, [dispatch, title]);

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
