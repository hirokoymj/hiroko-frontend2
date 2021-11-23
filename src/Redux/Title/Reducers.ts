import { combineReducers } from "redux";
import { Reducer } from "redux";

import { SET_TITLE, RESET_TITLE } from "./Actions";

const initialState = "";

const title: Reducer<typeof initialState> = (
  state = initialState,
  { type, title }
) => {
  switch (type) {
    case SET_TITLE: {
      return title;
    }
    case RESET_TITLE:
      return title;
    default:
      return state;
  }
};

export default combineReducers({
  title,
});
