import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ThemeProvider from "~/providers/ThemeProvider";

import type { RenderOptions, RenderResult } from "@testing-library/react";
import type { UserEvent } from "@testing-library/user-event";
import type { ReactNode } from "react";

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeProvider defaultTheme={"light"} attribute={"class"}>
      {children}
    </ThemeProvider>
  );
};

const customRender = (ui: ReactNode, options?: Omit<RenderOptions, "wrapper">): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options });

export const userEventSetup = (
  component: ReactNode
): {
  user: UserEvent;
  [key: string]: unknown;
} => {
  return {
    user: userEvent.setup(),
    ...customRender(component)
  };
};

export * from "@testing-library/react";
export { customRender as render };
