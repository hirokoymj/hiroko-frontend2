import React from "react";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import countReducer from "Redux/Counter/counterSlice";
import navigationReducer from "Redux/Navigation/navigationSlice";
import titleReducer from "Redux/Title/titleSlice";
import themeReducer from "Redux/Theme/themeSlice";

const rootReducer = combineReducers({
  form: formReducer,
  counter: countReducer,
  navigation: navigationReducer,
  title: titleReducer,
  theme: themeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const enableDevTools = process.env.NODE_ENV !== "production";

const store = configureStore({
  reducer: rootReducer,
  devTools: {
    trace: true,
    maxAge: 25,
    latency: 1000,
    autoPause: true,
    shouldRecordChanges: enableDevTools,
  },
});

type Props = {
  children: React.ReactNode;
};
export const ReduxProvider = ({ children }: Props) => (
  <Provider store={store}>{children}</Provider>
);
