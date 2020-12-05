import React from "react";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import { createStore, combineReducers } from "redux";

const reducers = combineReducers({
  form: formReducer,
});

export const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const ReduxProvider = ({ children }) => (
  <Provider store={store}>{children}</Provider>
);
