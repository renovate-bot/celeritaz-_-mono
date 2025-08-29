import React from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "~/shared/shadcn/ui/tooltip";

import { cn } from "~/lib/utils";

interface ShortenedNameProps {
  firstName: string;
  middleName?: string;
  lastName?: string;
  nameMasking?: boolean;
  className?: string;
  nameLength?: number;
}
const ShortenedName = ({
  firstName,
  middleName,
  lastName,
  nameMasking,
  className,
  nameLength = 20
}: ShortenedNameProps) => {
  if (nameMasking) {
    return <p className="cursor-pointer font-medium capitalize hover:underline">***************</p>;
  }

  const fullName = [firstName, middleName, lastName].join(" ");
  const displayName =
    fullName.length > nameLength ? `${fullName.substring(0, nameLength)}.....` : fullName;

  if (fullName.length <= nameLength) {
    return (
      <p className={cn("cursor-pointer font-medium capitalize hover:underline", className)}>
        {fullName}
      </p>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className={cn("cursor-pointer font-medium capitalize hover:underline", className)}>
            {displayName}
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="font-medium capitalize">{fullName}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ShortenedName;
