import { type ReactElement } from "react";
import { type Metadata } from "next";

import PatientLayout from "~/app/(with-patient-layout)/patient-layout";

export const metadata: Metadata = {
  title: "CeleriHealth - Home",
  description: "CeleriHealth is a health care platform.",
};

const Layout = ({ children }: { children: ReactElement }) => {
  return <PatientLayout>{children}</PatientLayout>;
};

export default Layout;
