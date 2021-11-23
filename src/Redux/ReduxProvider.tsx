import React from "react";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import navigationReducer from "Redux/Navigation/Reducers";
import titleReducer from "Redux/Title/Reducers";

const rootReducer = combineReducers({
  form: formReducer,
  navigation: navigationReducer,
  pageTitle: titleReducer,
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
