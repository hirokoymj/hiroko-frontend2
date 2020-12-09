import { combineReducers } from "redux";

import { OPEN_NAVIGATION, CLOSE_NAVIGATION } from "./Actions";

const navigationOpen = (state = true, action) => {
  switch (action.type) {
    case OPEN_NAVIGATION:
      return true;
    case CLOSE_NAVIGATION:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  navigationOpen,
});
