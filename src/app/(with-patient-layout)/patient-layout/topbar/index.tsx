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
import { api } from "~/trpc/react";

const TopBar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { setTheme, theme } = useTheme();
  const patientId = session?.user.id;
  const { data: profilePhoto } = api.patient.getProfilePhoto.useQuery({ id: "pat_KgUaEk8DWXHeS0" });
  return (
    <header
      className="bg-background sticky top-0 z-40 w-full border-b shadow-sm">
      <div className="flex h-16 items-center justify-between gap-7 px-4 sm:space-x-0 sm:px-[1rem]">
        <div className="block xl:hidden">
          <MobileSideBar />
        </div>
        <div className={"flex items-center justify-center gap-1 sm:gap-2 lg:justify-start"}>
          <Image src={"/logo.svg"} alt="celeritaz-logo" width={80} height={80} />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="h-9 w-9 overflow-hidden rounded-full border">
              <Image
                src={profilePhoto ?? "/placeholder-user.jpg"}
                alt="patient img"
                width={35}
                height={35}
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
