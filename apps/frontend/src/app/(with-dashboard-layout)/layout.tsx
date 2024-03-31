import { type ReactElement } from "react";
import { type Metadata } from "next";

import AuthGuard from "~/guards/AuthGuard";
import ThemeToggleButton from "~/shared/custom/theme-toggle-button";

// Todo: Add the layout for the dashboard here
export const metadata: Metadata = {
  title: "CeleriHealth - Home",
  description: "CeleriHealth is a health care platform."
};

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <AuthGuard>
      <>
        {children}
        <ThemeToggleButton />
      </>
    </AuthGuard>
  );
};

export default Layout;
