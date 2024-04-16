import "~/styles/globals.css";

import { type ReactElement } from "react";
import { type Metadata } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

import ThemeProvider from "~/providers/ThemeProvider";
import LoadingPage from "~/shared/custom/loading-page";
import TailwindIndicator from "~/shared/custom/tailwind-indicator";

import { cn } from "~/lib/utils";

export const metadata: Metadata = {
  title: "CeleriHealth",
  description: "CeleriHealth is a health care platform.",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: ReactElement }): ReactElement {
  return (
    <html
      lang="en"
      className={cn(GeistSans.variable, GeistMono.variable)}
      suppressHydrationWarning={true}>
      <body className={cn("bg-background font-sans")}>
        <TRPCReactProvider>
          <ThemeProvider
            attribute={"class"}
            defaultTheme={"system"}
            enableSystem
            disableTransitionOnChange>
                {children}
            <TailwindIndicator />
          </ThemeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
