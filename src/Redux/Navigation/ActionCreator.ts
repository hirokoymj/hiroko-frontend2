import { OPEN_NAVIGATION, CLOSE_NAVIGATION } from "./Actions";

export const openNavigation = (isOpen?: boolean) => ({
  type: OPEN_NAVIGATION,
  input: true,
  isOpen,
});

export const closeNavigation = () => ({
  type: CLOSE_NAVIGATION,
  input: false,
});
