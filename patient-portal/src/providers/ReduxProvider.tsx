"use client";

import { type ReactElement } from "react";

import { Provider } from "react-redux";

import { store } from "~/redux/store";

const ReduxProvider = ({ children }: { children: ReactElement }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
