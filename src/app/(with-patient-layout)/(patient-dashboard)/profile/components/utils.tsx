import React from "react";

import { format } from "date-fns";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/shared/shadcn/ui/accordion";
import { Card, CardContent } from "~/shared/shadcn/ui/card";

export const ProfileCards = ({
  title,
  children,
  edit
}: {
  title: string;
  children: React.ReactNode;
  edit: React.ReactNode;
}) => {
  return (
    <Card className="rounded-md px-1 py-0">
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full rounded-md px-1">
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="flex gap-1 py-2">
              <div className="flex w-full items-end-safe justify-between gap-1 overflow-hidden pr-1">
                <p className="flex-shrink-0 text-xs font-medium">{title}</p>
                <div onClick={(e) => e.stopPropagation()}>{edit}</div>
              </div>
            </AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export const LabelValue = ({
  label,
  value,
  type = "text"
}: {
  label: string;
  value: string | null | undefined;
  type?: "date" | "text" | "number";
}) => {
  return (
    <div className="grid w-full grid-cols-2 items-center">
      <div className="text-muted-foreground flex w-4/5 items-center justify-between text-[10px] font-normal">
        <p>{label}</p>:
      </div>
      <p className="text-foreground text-[10px] capitalize">
        {type === "date" && value ? format(value, "dd MMM yyyy") : (value ?? "--")}
      </p>
    </div>
  );
};
