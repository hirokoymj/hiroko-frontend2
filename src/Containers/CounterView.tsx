import { useState } from "react";
import { RootState } from "Redux/ReduxProvider";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
} from "Redux/Counter/counterSlice";
import {
  openNavigation,
  closeNavigation,
  toggleNavigation,
} from "Redux/Navigation/navigationSlice";
import { setTitle, resetTitle } from "Redux/Title/titleSlice";
import { setTheme } from "Redux/Theme/themeSlice";
import Switch from "@material-ui/core/Switch";

import { WorldClock } from "Components/Clock/WorldClock";
import "react-clock/dist/Clock.css";

export const CounterView = () => {
  const count = useSelector((state: RootState) => state.counter.value);
  const isOpen = useSelector((state: RootState) => state.navigation.isOpen);
  const title = useSelector((state: RootState) => state.title.text);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState("2");
  const [checked, setChecked] = useState(true);

  const handleChange = (event: any) => {
    setIncrementAmount(event.target.value);
  };

  const handleSwitchChange = (event: any) => {
    setChecked(event.target.checked);
    const themeName = event.target.checked ? "seasonal" : "common";
    dispatch(setTheme(themeName));
  };

  return (
    <div>
      <WorldClock />

      <Switch checked={checked} onChange={handleSwitchChange} />
      <hr />

      <div>
        <button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}>
          Increment
        </button>
        <h1>{count}</h1>
        <button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}>
          Decrement
        </button>
      </div>
      <div>
        <input
          type="number"
          name="amount"
          value={incrementAmount}
          onChange={handleChange}
        />
        <button
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }>
          Add Amount
        </button>
      </div>
      <hr />
      <h1>{isOpen.toString()}</h1>
      <button onClick={() => dispatch(closeNavigation())}>close</button>
      <button onClick={() => dispatch(openNavigation())}>open</button>
      <button onClick={() => dispatch(toggleNavigation())}>toggle</button>
      <hr />
      <h1>{title}</h1>
      <button onClick={() => dispatch(setTitle("TEST TITLE"))}>
        Set Title
      </button>
      <button onClick={() => dispatch(resetTitle())}>Reset Title</button>
    </div>
  );
};
