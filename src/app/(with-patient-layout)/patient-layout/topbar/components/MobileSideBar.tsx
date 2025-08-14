"use client";

import React, {
  cloneElement,
  Fragment,
  memo,
  useCallback,
  useState,
} from "react";
import CustomLink from "next/link";
import { usePathname } from "next/navigation";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Button } from "~/shared/shadcn/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "~/shared/shadcn/ui/sheet";

import { SIDEBAR_LINKS } from "~/app/(with-patient-layout)/patient-layout/sidebar/components/sidebar-links";
import { cn } from "~/lib/utils";

import type { ReactElement } from "react";

const SidebarButton = memo(
  ({
    name,
    link,
    icon,
    isActive,
    isIconsOnly,
    setIsSheetOpen,
  }: {
    name: string;
    link: string;
    icon: ReactElement;
    isActive: boolean;
    isIconsOnly: boolean;
    setIsSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => {
    return (
      <CustomLink href={link} className={"m-0 w-full"}>
        <Button
          variant={"secondary"}
          className={cn(
            "bg-background hover:bg-secondary w-full justify-start truncate border border-transparent px-2 shadow-none transition-all duration-150 ease-linear",
            isActive && "border-primary/10 bg-secondary text-primary",
            isIconsOnly && "w-fit",
          )}
          onClick={() => {
            setIsSheetOpen(false);
          }}
        >
          {icon && <span className={"shrink-0"}>{cloneElement(icon)}</span>}
          <span
            className={cn(
              "ml-2 text-xs duration-200 sm:text-sm",
              isIconsOnly && "hidden",
            )}
          >
            {name}
          </span>
        </Button>
      </CustomLink>
    );
  },
);
SidebarButton.displayName = "SidebarButton";
export default function MobileSideBar() {
  const pathname = usePathname();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const checkIfActive = useCallback(
    (href: string): boolean => {
      if (href === "/") return pathname === href;
      return pathname?.startsWith(href) ?? false;
    },
    [pathname],
  );
  return (
    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          size={"icon"}
          className={"mr-2 h-6 w-6 sm:h-9 sm:w-9 xl:hidden"}
          onClick={() => {
            setIsSheetOpen(true);
          }}
        >
          <HamburgerMenuIcon className={"h-3 w-3 sm:h-4 sm:w-4"} />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="w-3/5 py-10">
        <div className={"flex flex-col justify-center gap-2"}>
          {Object.entries(SIDEBAR_LINKS).map(([_, sidebarLink]) => {
            if (sidebarLink?.subTitle) {
              return (
                <Fragment key={sidebarLink.subTitle}>
                  <p
                    className={
                      "text-muted-foreground !mt-3 !mb-1 px-2 text-xs leading-4 uppercase duration-150"
                    }
                  >
                    {sidebarLink.subTitle}
                  </p>
                  {sidebarLink.subMenu && (
                    <div className={"flex flex-col gap-2"}>
                      {sidebarLink.subMenu?.map((subPage) => (
                        <SidebarButton
                          key={subPage.name}
                          name={subPage.name}
                          link={subPage.href}
                          icon={subPage.icon}
                          isActive={checkIfActive(subPage?.href)}
                          isIconsOnly={false}
                          setIsSheetOpen={setIsSheetOpen}
                        />
                      ))}
                    </div>
                  )}
                </Fragment>
              );
            }
            if (sidebarLink?.name) {
              return (
                <SidebarButton
                  key={sidebarLink.name}
                  name={sidebarLink.name}
                  link={sidebarLink?.href ?? ""}
                  icon={sidebarLink?.icon ?? <></>}
                  isActive={checkIfActive(sidebarLink?.href ?? "")}
                  isIconsOnly={false}
                  setIsSheetOpen={setIsSheetOpen}
                />
              );
            }
          })}
        </div>
      </SheetContent>
    </Sheet>
  );
}
