import "~/styles/globals.css";

import { type ReactElement } from "react";
import { type Metadata } from "next";
import { Inter } from "next/font/google";

import { UserProvider as Auth0Provider } from "@auth0/nextjs-auth0/client";

import { cn } from "~/utils/styles";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CeleriHealth",
  description: "CeleriHealth is a health care platform."
};

export default function RootLayout({ children }: { children: ReactElement }): ReactElement {
  return (
    <html lang="en">
      <body className={cn("bg-background", inter.className)}>
        <Auth0Provider>{children}</Auth0Provider>
      </body>
    </html>
  );
}
