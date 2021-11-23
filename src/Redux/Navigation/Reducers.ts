import { combineReducers } from "redux";
import { Reducer } from "redux";

import { OPEN_NAVIGATION, CLOSE_NAVIGATION } from "./Actions";

const initialState = false;
const navigationOpen: Reducer<typeof initialState> = (
  state = initialState,
  { type, input }
) => {
  switch (type) {
    case OPEN_NAVIGATION:
      return input;
    case CLOSE_NAVIGATION:
      return input;
    default:
      return state;
  }
};

export default combineReducers({
  navigationOpen,
});
