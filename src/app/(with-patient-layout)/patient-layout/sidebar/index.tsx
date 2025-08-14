"use client";

import { cloneElement, Fragment, memo, useCallback, useState } from "react";
import CustomLink from "next/link";
import { usePathname } from "next/navigation";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useDispatch, useSelector } from "react-redux";

import { toggleSidebar } from "~/redux/slices/siderbar-slice";
import { type RootState } from "~/redux/store";
import { Button } from "~/shared/shadcn/ui/button";
import { ScrollArea } from "~/shared/shadcn/ui/scroll-area";
import { Separator } from "~/shared/shadcn/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "~/shared/shadcn/ui/tooltip";

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
  }: {
    name: string;
    link: string;
    icon: ReactElement;
    isActive: boolean;
    isIconsOnly: boolean;
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
        >
          {icon && <span className={"shrink-0"}>{cloneElement(icon)}</span>}
          <span className={cn("ml-2 duration-200", isIconsOnly && "hidden")}>
            {name}
          </span>
        </Button>
      </CustomLink>
    );
  },
);
SidebarButton.displayName = "SidebarButton";

const SidebarList = memo(({ iconsOnly }: { iconsOnly: boolean }) => {
  const pathname = usePathname();

  const checkIfActive = useCallback(
    (href: string): boolean => {
      if (href === "/") return pathname === href;
      return pathname?.startsWith(href) ?? false;
    },
    [pathname],
  );

  return (
    <div className={"border-border h-full w-full border-r"}>
      <ScrollArea
        className={cn(
          "h-full transition-all duration-150 ease-in-out",
          iconsOnly ? "w-16" : "w-60",
        )}
        scrollHideDelay={300}
      >
        <div className={"flex flex-col justify-center gap-2 px-3 py-4"}>
          {Object.entries(SIDEBAR_LINKS).map(([_, sidebarLink]) => {
            if (sidebarLink?.subTitle) {
              return (
                <Fragment key={sidebarLink.subTitle}>
                  {!iconsOnly ? (
                    <p
                      className={
                        "text-muted-foreground !mt-3 !mb-1 px-2 text-xs leading-4 uppercase duration-150"
                      }
                    >
                      {sidebarLink.subTitle}
                    </p>
                  ) : (
                    <Separator className={cn("bg-primary/20 !my-2")} />
                  )}

                  {sidebarLink.subMenu && (
                    <div className={"flex flex-col gap-2"}>
                      {sidebarLink.subMenu?.map((subPage) => (
                        <SidebarButton
                          key={subPage.name}
                          name={subPage.name}
                          link={subPage.href}
                          icon={subPage.icon}
                          isActive={checkIfActive(subPage?.href)}
                          isIconsOnly={iconsOnly}
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
                  isIconsOnly={iconsOnly}
                />
              );
            }
          })}
        </div>
      </ScrollArea>
    </div>
  );
});
SidebarList.displayName = "SidebarList";

const DesktopSidebar = memo(() => {
  const isIconsOnly = useSelector(
    (state: RootState) => state.sidebar.isIconsOnly,
  );
  const dispatch = useDispatch();
  const [hover, setHover] = useState(false);

  const handleMouseEnter = () => {
    if (isIconsOnly) setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      data-testid={"desktop-sidebar"}
      className={"hidden duration-150 xl:relative xl:block"}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <SidebarList iconsOnly={!hover && isIconsOnly} />
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant={"outline"}
            size={"icon"}
            className={cn(
              "border-primary/20 absolute inset-y-0 -right-2.5 z-50 m-auto h-5 w-5 rotate-0 rounded-full transition-all duration-300",
              isIconsOnly && "rotate-180",
            )}
            onClick={() => {
              dispatch(toggleSidebar());
              setHover(false);
            }}
          >
            <ArrowLeftIcon className={"h-3 w-3"} />
          </Button>
        </TooltipTrigger>
        <TooltipContent side={"top"} sideOffset={4}>
          {isIconsOnly ? "Expand" : "Collapse"}
        </TooltipContent>
      </Tooltip>
    </div>
  );
});
DesktopSidebar.displayName = "DesktopSidebar";

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      {/*<MobileSidebar />*/}
    </>
  );
};

export default Sidebar;
