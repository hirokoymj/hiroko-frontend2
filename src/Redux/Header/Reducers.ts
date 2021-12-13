import { combineReducers } from "redux";

import { actions } from "./Actions";
import { HeaderActionType } from "./ActionCreator";

export const navigationOpen = (state = true, action: HeaderActionType) => {
  switch (action.type) {
    case actions.OPEN_NAVIGATION:
      return true;
    case actions.CLOSE_NAVIGATION:
      return false;
    default:
      return state;
  }
};

export const title = (state = "", action: HeaderActionType) => {
  switch (action.type) {
    case actions.SET_TITLE: {
      return action.title;
    }
    case actions.RESET_TITLE:
      return "";
    default:
      return state;
  }
};

export default combineReducers({
  navigationOpen,
  title,
});
