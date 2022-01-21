import React, { useEffect, useState } from "react";
import Clock from "react-clock";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  worldClock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

export const WorldClock = () => {
  const [value, setValue] = useState(new Date());
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className={classes.worldClock}>
      <Clock value={value} renderNumbers="true" />
    </div>
  );
};
