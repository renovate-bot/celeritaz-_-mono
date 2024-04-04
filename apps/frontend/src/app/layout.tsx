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
  description: "CeleriHealth is a health care platform.",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: ReactElement }): ReactElement {
  return (
    <html lang="en" className={cn(GeistSans.variable, GeistMono.variable)} suppressHydrationWarning={true}>
      <body className={cn("bg-background font-sans")}>
        <ThemeProvider attribute={"class"} defaultTheme={"system"} enableSystem disableTransitionOnChange>
          <Auth0Provider>{children}</Auth0Provider>
          <TailwindIndicator />
        </ThemeProvider>
      </body>
    </html>
  );
}
