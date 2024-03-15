import "~/styles/globals.css";

import { type ReactElement } from "react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { cn } from "~/utils/styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CeleriHealth",
  description: "CeleriHealth is a health care platform."
};

export default function RootLayout({ children }: { children: ReactElement }): ReactElement {
  return (
    <html lang="en">
      <body className={cn("bg-background", inter.className)}>{children}</body>
    </html>
  );
}
