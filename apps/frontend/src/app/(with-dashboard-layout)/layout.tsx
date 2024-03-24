import { type ReactElement } from "react";
import { type Metadata } from "next";

import AuthGuard from "~/guards/AuthGuard";

// Todo: Add the layout for the dashboard here
export const metadata: Metadata = {
  title: "CeleriHealth - Home",
  description: "CeleriHealth is a health care platform."
};

const Layout = ({ children }: { children: ReactElement }) => {
  return <AuthGuard>{children}</AuthGuard>;
};

export default Layout;
