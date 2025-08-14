import "~/styles/globals.css";

import { type ReactElement } from "react";
import { type Metadata } from "next";

import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";

import { TRPCReactProvider } from "~/trpc/react";

import ReduxProvider from "~/providers/ReduxProvider";
import ThemeProvider from "~/providers/ThemeProvider";
import TailwindIndicator from "~/shared/custom/tailwind-indicator";
import { Toaster } from "~/shared/shadcn/ui/sonner";

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
            <ReduxProvider>
              <ThemeProvider
                attribute={"class"}
                defaultTheme={"system"}
                enableSystem
                disableTransitionOnChange>
                {children}
                <Toaster />
                <TailwindIndicator />
              </ThemeProvider>
            </ReduxProvider>
          </TRPCReactProvider>
        </body>
      </html>
  );
}
