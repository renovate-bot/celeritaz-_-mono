import "@celeritaz/ui/globals.css";

import { type ReactElement } from "react";
import { type Metadata } from "next";

import { UserProvider as Auth0Provider } from "@auth0/nextjs-auth0/client";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { cn } from "@celeritaz/ui/lib/utils";

import ThemeProvider from "~/providers/ThemeProvider.tsx";
import TailwindIndicator from "~/shared/custom/tailwind-indicator";

export const metadata: Metadata = {
  title: "CeleriHealth",
  description: "CeleriHealth is a health care platform."
};

export default function RootLayout({ children }: { children: ReactElement }): ReactElement {
  return (
    <html lang="en">
      <body className={cn("bg-background", GeistSans.variable, GeistMono.variable)}>
        <ThemeProvider attribute={"class"} defaultTheme={"system"} disableTransitionOnChange>
          <Auth0Provider>{children}</Auth0Provider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
