"use client";

import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "~/shared/shadcn/ui/button";

import type { ButtonProps } from "~/shared/shadcn/ui/button";

const ThemeToggleButton = (props: ButtonProps) => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      {...props}
      variant="outline"
      size="icon"
      data-testid="theme-toggle-button"
      onClick={() => {
        setTheme(theme === "dark" ? "light" : "dark");
      }}>
      <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0" />
      <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggleButton;
