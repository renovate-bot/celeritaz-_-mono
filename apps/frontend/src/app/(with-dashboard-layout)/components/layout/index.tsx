import React from "react";

import Sidebar from "~/app/(with-dashboard-layout)/components/layout/components/sidebar";
import Topbar from "~/app/(with-dashboard-layout)/components/layout/components/topbar";

import type { ReactElement } from "react";

const Layout = ({ children }: { children: ReactElement }) => {
  return (
    <div className={"relative flex min-h-screen flex-col"}>
      <Topbar />
      <div className={"flex max-h-[calc(100vh-4.2rem)] flex-1"}>
        <Sidebar />
        <div id={"content"} className={"relative flex-1 overflow-auto"}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
