import { type ReactElement } from "react";

import { screen } from "@testing-library/react";
import { useTheme } from "next-themes";
import { describe } from "vitest";

import ThemeToggleButton from "~/shared/custom/theme-toggle-button/index";
import { render, userEventSetup } from "~/tests/test-utils";

const ThemeToggleWithSpy = (): ReactElement => {
  const { theme } = useTheme();
  return (
    <>
      <ThemeToggleButton />
      <span data-testid="theme-spy">{theme}</span>
    </>
  );
};

describe("Theme Toggle Button", () => {
  it("should have the default light theme", () => {
    const { getByTestId } = render(<ThemeToggleWithSpy />);
    const spy = getByTestId("theme-spy");

    expect(spy.textContent).toBe("light");
  });

  it("should toggle the theme when clicked", async () => {
    const { user } = userEventSetup(<ThemeToggleWithSpy />);

    const button = screen.getByTestId("theme-toggle-button");
    const spy = screen.getByTestId("theme-spy");

    await user.click(button);
    expect(spy.textContent).toBe("dark");

    await user.click(button);
    expect(spy.textContent).toBe("light");
  });
});
