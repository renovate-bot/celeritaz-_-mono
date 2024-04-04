import { type ReactElement } from "react";
import { type Metadata } from "next";

import { TooltipProvider } from "@ui/shadcn/ui/tooltip.tsx";

import Layout from "~/app/(with-dashboard-layout)/components/layout";
import AuthGuard from "~/guards/AuthGuard";

// Todo: Add the layout for the dashboard here
export const metadata: Metadata = {
  title: "CeleriHealth - Home",
  description: "CeleriHealth is a health care platform."
};

const DashboardLayout = ({ children }: { children: ReactElement }) => {
  return (
    <AuthGuard>
      <TooltipProvider>
        <Layout>{children}</Layout>
      </TooltipProvider>
    </AuthGuard>
  );
};

export default DashboardLayout;
