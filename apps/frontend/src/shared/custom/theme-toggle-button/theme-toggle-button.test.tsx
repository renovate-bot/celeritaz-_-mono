import { act } from "@testing-library/react";
import { useTheme } from "next-themes";
import { describe } from "vitest";

import ThemeToggleButton from "~/shared/custom/theme-toggle-button/index.tsx";
import { render } from "~/tests/test-utils.tsx";

const ThemeSpy = () => {
  const { theme } = useTheme();
  return <span data-testid="theme-spy">{theme}</span>;
};

describe("Theme Toggle Button", () => {
  it("should have the default light theme", () => {
    const { getByTestId } = render(
      <>
        <ThemeToggleButton />
        <ThemeSpy />
      </>
    );
    const spy = getByTestId("theme-spy");

    expect(spy.textContent).toBe("light");
  });

  it("should toggle the theme when clicked", () => {
    const { getByTestId } = render(
      <>
        <ThemeToggleButton />
        <ThemeSpy />
      </>
    );
    const button = getByTestId("theme-toggle-button");
    const spy = getByTestId("theme-spy");

    act(() => {
      button.click();
    });
    expect(spy.textContent).toBe("dark");

    act(() => {
      button.click();
    });
    expect(spy.textContent).toBe("light");
  });
});
