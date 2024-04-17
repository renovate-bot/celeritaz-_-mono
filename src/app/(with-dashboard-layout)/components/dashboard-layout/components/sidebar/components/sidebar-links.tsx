import { Grid, LayoutPanelLeft } from "lucide-react";

import type { ReactElement } from "react";

export type SidebarLinkType = Record<
  string,
  {
    subTitle?: string;
    name?: string;
    href?: string;
    icon?: ReactElement;
    subMenu?: Array<{
      name: string;
      href: string;
      icon: ReactElement;
    }>;
  }
>;

export const SIDEBAR_LINKS: SidebarLinkType = {
  home: {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutPanelLeft />
  },
  patients: {
    subTitle: "Patient Management",
    subMenu: [
      {
        name: "Patients",
        href: "/patients",
        icon: <Grid />
      }
    ]
  }
};
