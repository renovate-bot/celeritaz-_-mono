import { CircleUser } from "lucide-react";

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
    name: "Home",
    href: "/home",
    icon: <CircleUser />,
  },
  //   doctors: {
  //     name: "Calendar",
  //     href: "/schedule",
  //     icon: <Calendar />
  //   },
  //   patients: {
  //     subTitle: "Patient Management",
  //     subMenu: [
  //       {
  //         name: "Registrations",
  //         href: "/patients",
  //         icon: <UserPlus />
  //       },
  //       {
  //         name: "IPD Admission",
  //         href: "/IPD/admission",
  //         icon: <ClipboardList />
  //       }
  //     ]
  //   },
  //   appointment: {
  //     subTitle: "Appointment",
  //     subMenu: [
  //       {
  //         name: "Schedule",
  //         href: "/appointment/schedule",
  //         icon: <Stethoscope />
  //       },
  //       {
  //         name: "Manage",
  //         href: "/appointment/manage",
  //         icon: <NotebookText />
  //       },
  //       {
  //         name: "Immunization",
  //         href: "/appointment/immunization",
  //         icon: <Syringe />
  //       }
  //     ]
  //   },
  //   bedManagement: {
  //     subTitle: "Bed Management",
  //     subMenu: [
  //       {
  //         name: "Bed Management",
  //         href: "/bed-dashboard",
  //         icon: <BedSingle />
  //       }
  //     ]
  //   },
  //   // mis: {
  //   //   name: "MIS",
  //   //   href: "/mis",
  //   //   icon: <Settings2 />
  //   // },
  //   // report: {
  //   //   name: "Completed Reports",
  //   //   href: "/reports",
  //   //   icon: <FilePenLine />
  //   // },
  //   management: {
  //     subTitle: "HRMS",
  //     subMenu: [
  //       {
  //         name: "Users",
  //         href: "/users",
  //         icon: <CircleUser />
  //       },
  //       {
  //         name: "Roles",
  //         href: "/roles",
  //         icon: <BookUser />
  //       },
  //       {
  //         name: "Settings",
  //         href: "/settings",
  //         icon: <Settings2 />
  //       },
  //       {
  //         name: "Leave Policy",
  //         href: "/leave-policy",
  //         icon: <BookUser />
  //       },
  //       {
  //         name: "Leaves",
  //         href: "/leaves",
  //         icon: <Album />
  //       },
  //       {
  //         name: "Approve Leaves",
  //         href: "/approve-leave-requests",
  //         icon: <BookOpenCheck />
  //       }
  //     ]
  //   },
  //   pharmacy: {
  //     subTitle: "Pharmacy",
  //     subMenu: [
  //       {
  //         name: "Order Book",
  //         href: "/pharmacy/order-book",
  //         icon: <BookText />
  //       },
  //       {
  //         name: "Inventory",
  //         href: "/inventory",
  //         icon: <Boxes />
  //       },
  //       {
  //         name: "Sales",
  //         href: "/sales",
  //         icon: <Tag />
  //       },
  //       {
  //         name: "Purchase",
  //         href: "/purchase",
  //         icon: <Import />
  //       },
  //       {
  //         name: "IPD Requests",
  //         href: "/pharmacy/ipd",
  //         icon: <PillBottle />
  //       }
  //     ]
  //   },
  //   EMR: {
  //     subTitle: "EMR",
  //     subMenu: [
  //       {
  //         name: "My Portal",
  //         href: "/EMR/my-portal",
  //         icon: <FilePenLine />
  //       },
  //       {
  //         name: "Referrals",
  //         href: "/EMR/referral-request",
  //         icon: <User />
  //       },
  //       {
  //         name: "Immunization",
  //         href: "/EMR/immunization",
  //         icon: <Syringe />
  //       },
  //       {
  //         name: "MDC",
  //         href: "/EMR/MDC",
  //         icon: <NotepadText />
  //       }
  //     ]
  //   },
  //   Counselling: {
  //     subTitle: "Counselling",
  //     subMenu: [
  //       {
  //         name: "Counselling",
  //         href: "/counselling",
  //         icon: <MessageCircleCode />
  //       }
  //     ]
  //   },
  //   Billing: {
  //     subTitle: "OPD Billing",
  //     subMenu: [
  //       {
  //         name: "Orders",
  //         href: "/opd-billing/orders/existing",
  //         icon: <IndianRupee />
  //       },
  //       {
  //         name: "UHID Advance",
  //         href: "/opd-billing/advance/uhid-advance-list",
  //         icon: <Wallet />
  //       },
  //       {
  //         name: "Approvals",
  //         href: "/opd-billing/approvals/request",
  //         icon: <FileCheck2 />
  //       }
  //     ]
  //   },
  //   Diagnostic: {
  //     subTitle: "Diagnostic",
  //     subMenu: [
  //       {
  //         name: "Pathology",
  //         href: "/diagnostic/pathology/active",
  //         icon: <Microscope />
  //       },
  //       {
  //         name: "Radiology",
  //         href: "/diagnostic/radiology/active",
  //         icon: <SquareActivity />
  //       },
  //       {
  //         name: "Cardiology",
  //         href: "/diagnostic/cardiology/active",
  //         icon: <HeartPulse />
  //       },
  //       {
  //         name: "Neurology",
  //         href: "/diagnostic/neurology/active",
  //         icon: <Brain />
  //       },
  //       {
  //         name: "Dialysis",
  //         href: "/diagnostic/dialysis/active",
  //         icon: <Droplet />
  //       },
  //       {
  //         name: "Nuclear Medicine",
  //         href: "/diagnostic/nuclear-medicine/active",
  //         icon: <Radiation />
  //       }
  //     ]
  //   },
  //   IPDBilling: {
  //     subTitle: "IPD Billing",
  //     subMenu: [
  //       {
  //         name: "Billing",
  //         href: "/ipd-billing/billing/dashboard",
  //         icon: <IndianRupee />
  //       },
  //       {
  //         name: "IPD Advance",
  //         href: "/ipd-billing/ipd-advance/advance-list",
  //         icon: <Wallet />
  //       }
  //     ]
  //   },
  //   ot: {
  //     subTitle: "Operation Theater",
  //     subMenu: [
  //       {
  //         name: "IPD Surgery Request",
  //         href: "/OT/IPD-surgery-request",
  //         icon: <SquareActivity />
  //       },
  //       {
  //         name: "Pre OP Transfer Request",
  //         href: "/preop-transfer-request",
  //         icon: <BedSingle />
  //       }
  //     ]
  //   },
  //   kitchen: {
  //     subTitle: "Kitchen",
  //     subMenu: [
  //       {
  //         name: "Orders",
  //         href: "/kitchen/orders",
  //         icon: <CookingPot />
  //       }
  //     ]
  //   },
  //   bloodBank: {
  //     subTitle: "Blood Bank",
  //     subMenu: [
  //       {
  //         name: "Order Book",
  //         href: "/blood-bank/order-book",
  //         icon: <BookText />
  //       },
  //       {
  //         name: "Inventory",
  //         href: "/blood-bank/inventory",
  //         icon: <Droplets />
  //       },
  //       {
  //         name: "Requests",
  //         href: "/blood-bank/requests",
  //         icon: <ClipboardList />
  //       },
  //       {
  //         name: "Purchase",
  //         href: "/blood-bank/purchase",
  //         icon: <Package />
  //       }
  //     ]
  //   },
  //   doctorPayout: {
  //     subTitle: "Doctor Payout",
  //     subMenu: [
  //       {
  //         name: "Payout Configuration",
  //         href: "/doctor-payout/payout-configuration",
  //         icon: <IndianRupee />
  //       },
  //       {
  //         name: "Bill Posting",
  //         href: "/doctor-payout/bill-posting",
  //         icon: <ReceiptText />
  //       },
  //       {
  //         name: "Payout Summary",
  //         href: "/doctor-payout/payout-summary",
  //         icon: <ClipboardList />
  //       }
  //     ]
  //   }
};
