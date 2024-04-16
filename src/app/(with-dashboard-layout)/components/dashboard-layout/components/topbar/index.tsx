import { SignedIn, UserButton } from "@clerk/nextjs";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import ThemeToggleButton from "~/shared/custom/theme-toggle-button";
import { Button } from "~/shared/shadcn/ui/button";

const TopBar = () => {
  return (
    <header
      data-testid={"topbar"}
      className="sticky top-0 z-40 w-full border-b bg-background shadow-sm">
      <div className="flex h-16 items-center px-4 sm:justify-between sm:space-x-0 sm:px-[1rem]">
        <Button variant={"outline"} size={"icon"} className={"mr-2 xl:hidden"}>
          <HamburgerMenuIcon className={"h-4 w-4"} />
        </Button>
        <div className={"flex flex-row items-center gap-2"}>
          <h3
            className={
              "mr-4 text-xl font-bold leading-none tracking-tight text-primary lg:text-3xl"
            }>
            CeleriHealth
          </h3>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center gap-4">
            <ThemeToggleButton />
          </nav>
          <SignedIn>
            <UserButton afterSignOutUrl={"/sign-in"} />
          </SignedIn>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
