import { type ReactElement } from "react";
import { type Metadata } from "next";

import { auth } from "@clerk/nextjs/server";

import DashboardLayout from "~/app/(with-dashboard-layout)/components/dashboard-layout";

export const metadata: Metadata = {
  title: "CeleriHealth - Home",
  description: "CeleriHealth is a health care platform."
};

const Layout = ({ children }: { children: ReactElement }) => {
  auth().protect();
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default Layout;
