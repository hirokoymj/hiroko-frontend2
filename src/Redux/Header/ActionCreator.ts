import { actions } from "./Actions";

export type HeaderActionType =
  | {
      type: actions.OPEN_NAVIGATION;
    }
  | {
      type: actions.CLOSE_NAVIGATION;
    }
  | {
      type: actions.SET_TITLE;
      title: string;
    }
  | {
      type: actions.RESET_TITLE;
    };

export const actionCreator = {
  openNavigation: () => ({
    type: actions.OPEN_NAVIGATION,
  }),
  closeNavigation: () => ({
    type: actions.CLOSE_NAVIGATION,
  }),
  setTitle: (title: string) => ({
    type: actions.SET_TITLE,
    title,
  }),
  resetTitle: () => ({
    type: actions.RESET_TITLE,
  }),
};
