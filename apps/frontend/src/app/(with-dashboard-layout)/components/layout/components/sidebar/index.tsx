"use client";

import { cloneElement, Fragment, memo, useCallback, useState } from "react";
import CustomLink from "next/link";
import { usePathname } from "next/navigation";

import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn } from "@ui/lib/utils";
import { Button } from "@ui/shadcn/ui/button";
import { ScrollArea } from "@ui/shadcn/ui/scroll-area";
import { Separator } from "@ui/shadcn/ui/separator";
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui/shadcn/ui/tooltip";
import { Grid, LayoutPanelLeft } from "lucide-react";

import type { ReactElement } from "react";

const pages: Record<
  string,
  {
    subTitle?: string;
    name?: string;
    href?: string;
    icon?: ReactElement;
    subMenu?: Array<{
      name: string;
      href: string;
      icon: ReactElement;
    }>;
  }
> = {
  home: {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutPanelLeft />
  },
  patients: {
    subTitle: "Patient Management",
    subMenu: [
      {
        name: "Patients",
        href: "/patients",
        icon: <Grid />
      }
    ]
  }
};

const SidebarButton = memo(
  ({
    name,
    link,
    icon,
    isActive,
    isIconsOnly
  }: {
    name: string;
    link: string;
    icon: ReactElement;
    isActive: boolean;
    isIconsOnly: boolean;
  }) => {
    return (
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          <CustomLink href={link} className={"m-0 w-full"}>
            <Button
              variant={isActive ? "secondary" : "ghost"}
              className={cn(
                "w-full justify-start truncate border border-transparent px-2 shadow-none duration-150",
                isActive && "border-primary/10 text-primary dark:text-primary-foreground",
                isIconsOnly && "w-fit"
              )}>
              {icon && (
                <span className={"shrink-0"}>
                  {cloneElement(icon, {
                    className: cn("h-5 w-5", isActive && "stroke-current")
                  })}
                </span>
              )}
              {!isIconsOnly && <span className={cn("ml-2")}>{name}</span>}
            </Button>
          </CustomLink>
        </TooltipTrigger>
        <TooltipContent
          side={"right"}
          className={cn("z-[100]", !isIconsOnly && "hidden")}
          sideOffset={4}>
          {name}
        </TooltipContent>
      </Tooltip>
    );
  }
);
SidebarButton.displayName = "SidebarButton";

const SidebarList = memo(({ iconsOnly }: { iconsOnly: boolean }) => {
  const pathname = usePathname();

  const checkIfActive = useCallback(
    (href: string): boolean => {
      if (href === "/") return pathname === href;
      return pathname?.startsWith(href) ?? false;
    },
    [pathname]
  );

  return (
    <div className={"h-full w-full border-r border-border"}>
      <ScrollArea
        className={cn("h-full w-60 transition-all duration-150 ease-in-out", iconsOnly && "w-16")}
        scrollHideDelay={300}>
        <div className={"flex flex-col justify-center gap-2 px-3 py-4"}>
          {Object.entries(pages).map(([_, page]) => {
            if (page?.subTitle) {
              return (
                <Fragment key={page.subTitle}>
                  {!iconsOnly ? (
                    <p
                      className={
                        "!mb-1 !mt-3 px-2 text-xs uppercase leading-4 text-muted-foreground duration-150"
                      }>
                      {page.subTitle}
                    </p>
                  ) : (
                    <Separator className={cn("!my-2 bg-primary/20")} />
                  )}

                  {page.subMenu && (
                    <div className={"flex flex-col gap-2"}>
                      {page.subMenu?.map((subPage) => (
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
            if (page?.name) {
              return (
                <SidebarButton
                  key={page.name}
                  name={page.name}
                  link={page?.href ?? ""}
                  icon={page?.icon ?? <></>}
                  isActive={checkIfActive(page?.href ?? "")}
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
  const [isIconsOnly, setIsIconsOnly] = useState<boolean>(false);

  const toggleIconsOnly = useCallback(() => {
    setIsIconsOnly((prev: boolean) => !prev);
  }, [isIconsOnly]);

  return (
    <div className={"hidden duration-150 xl:relative xl:block"}>
      <SidebarList iconsOnly={isIconsOnly} />
      <Button
        variant={"outline"}
        size={"icon"}
        className={cn(
          "hover:border-sample absolute inset-y-0 -right-2.5 z-50 m-auto h-5 w-5 rotate-0 rounded-full border-primary/20 transition-all duration-300",
          isIconsOnly && "rotate-180"
        )}
        onClick={toggleIconsOnly}>
        <ArrowLeftIcon className={"h-3 w-3"} />
      </Button>
    </div>
  );
});
DesktopSidebar.displayName = "DesktopSidebar";

/*const MobileSidebar = () => {

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1280 && isSidebarOpen) {
        toggleSidebar();
      }
    };

    // Listener for window resize event
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const countRef = useRef(0);
  countRef.current += 1;

  console.log(
    "Mobile Sidebar rendering " + countRef.current + " " + Date.now(),
  );

  return (
    <Sheet
      onOpenChange={() => {
        if (window.innerWidth <= 1280) {
          toggleSidebar();
        }
      }}
      open={isSidebarOpen}
    >
      <SheetContent side={"left"}>
        <SheetHeader>
          <SheetTitle>Celerihealth</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servsdsders.
          </SheetDescription>
          {/!*<SidebarList iconsOnly={false} />*!/}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};*/

const Sidebar = () => {
  return (
    <>
      <DesktopSidebar />
      {/*<MobileSidebar />*/}
    </>
  );
};

export default Sidebar;
