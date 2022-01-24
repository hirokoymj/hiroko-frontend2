import React, { useEffect, useState } from "react";
import Clock, { ClockValue } from "react-clock";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  worldClock: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
}));

interface IProps {
  localTime: string;
}

export const WorldClock = ({ localTime }: IProps) => {
  const [value, setValue] = useState<ClockValue>(new Date(localTime));
  const classes = useStyles();

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date(localTime)), 1000);
    return () => {
      clearInterval(interval);
    };
  }, [localTime]);

  return (
    <div className={classes.worldClock}>
      <Clock value={value} renderNumbers={true} />
    </div>
  );
};
