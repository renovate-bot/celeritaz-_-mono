import { type ReactElement } from "react";
import { type Metadata } from "next";

import DashboardLayout from "~/app/(with-dashboard-layout)/components/dashboard-layout";
import AuthGuard from "~/guards/AuthGuard";

export const metadata: Metadata = {
  title: "CeleriHealth - Home",
  description: "CeleriHealth is a health care platform."
};

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <AuthGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </AuthGuard>
  );
};

export default Layout;
