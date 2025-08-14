"use client";

import { useRouter } from "next/navigation";

import { HeartPulse, User } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "~/shared/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/shared/shadcn/ui/dropdown-menu";

import MobileSideBar from "./components/MobileSideBar";
import { signOut } from "~/lib/auth-client";

const TopBar = () => {
  const router = useRouter();
  const { setTheme, theme } = useTheme();
  return (
    <header
      data-testid={"topbar"}
      className="bg-background sticky top-0 z-40 w-full border-b shadow-sm"
    >
      <div className="flex h-16 items-center justify-between gap-7 px-4 sm:space-x-0 sm:px-[1rem]">
        <div className="block xl:hidden">
          <MobileSideBar />
        </div>
        <div
          className={
            "flex items-center justify-center gap-1 sm:gap-2 lg:justify-start"
          }
        >
          <HeartPulse className="text-primary h-6 w-6 sm:h-8 sm:w-8" />
          <h1 className="text-xl font-bold duration-150 sm:text-3xl">
            Celeri<span className={"text-primary"}>Health</span>
          </h1>
        </div>
        <div className="">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="h-6 w-6 rounded-full sm:h-9 sm:w-9"
              >
                <User className="text-muted-foreground h-3 w-3 sm:h-5 sm:w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel className="text-xs sm:text-sm">
                My Account
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-xs sm:text-sm">
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="text-xs sm:text-sm">
                Support
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-xs sm:text-sm"
              >
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  console.log("Logout");
                  signOut()
                    .then(() => {
                      void router.push("/auth/signin");
                    })
                    .catch((e) => {
                      console.log(e);
                    });
                }}
                className="text-xs sm:text-sm"
              >
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
