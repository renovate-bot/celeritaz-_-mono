"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import { useTheme } from "next-themes";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/shared/shadcn/ui/dropdown-menu";

import { signOut, useSession } from "~/lib/auth-client";

import MobileSideBar from "./components/MobileSideBar";
import UpdateProfilePhoto from "./components/UpdateProfilePhoto";

const TopBar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();
  const patientId = session?.user.id;
  return (
    <header
      data-testid={"topbar"}
      className="bg-background sticky top-0 z-40 w-full border-b shadow-sm">
      <div className="flex h-16 items-center justify-between gap-7 px-4 sm:space-x-0 sm:px-[1rem]">
        <div className="block xl:hidden">
          <MobileSideBar />
        </div>
        <div className={"flex items-center justify-center gap-1 sm:gap-2 lg:justify-start"}>
          <Image src={"/celeritaz-log.png"} alt="celeritaz-logo" width={80} height={80} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-6 w-6 overflow-hidden rounded-full">
              <Image
                src={"/placeholder-user.jpg"}
                alt="patient img"
                width={25}
                height={25}
                className="object-cover"
              />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => router.push("/profile")}
              className="text-xs sm:text-sm">
              My Account
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs sm:text-sm">
              <UpdateProfilePhoto patientId={patientId ?? ""} />
            </DropdownMenuItem>
            <DropdownMenuItem className="text-xs sm:text-sm">Settings</DropdownMenuItem>
            <DropdownMenuItem className="text-xs sm:text-sm">Support</DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-xs sm:text-sm">
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
              className="text-xs sm:text-sm">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default TopBar;
