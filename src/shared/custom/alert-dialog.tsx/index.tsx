"use client";

import React, { useState } from "react";

import { LoaderCircle } from "lucide-react";

import { Button } from "~/shared/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger
} from "~/shared/shadcn/ui/dialog";

import { cn } from "~/lib/utils";

export default function AlertDialog({
  onConfirm,
  description,
  buttonVariant,
  buttonName = "Submit",
  triggerClassName,
  children,
  buttonType = "button",
  submitButtonClassName,
  cancelButtonClassName,
  isLoading
}: {
  onConfirm: () => void;
  description?: string;
  buttonVariant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost";
  buttonName?: string;
  children?: React.ReactNode;
  buttonType?: "button" | "submit" | "reset";
  submitButtonClassName?: string;
  cancelButtonClassName?: string;
  triggerClassName?: string;
  isLoading?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button
            type="button"
            variant={buttonVariant ?? "default"}
            className={cn("sm:w-32 sm:p-5", triggerClassName)}
            disabled={isLoading}>
            {isLoading && <LoaderCircle className="mr-3 h-5 w-5 animate-spin" />}
            {buttonName}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="w-[200px] sm:max-w-[300px] rounded-xl p-5">
        <DialogHeader className="text-[11px] sm:text-sm mt-3 sm:pr-5">
          {description ?? "Are you sure you want to submit?"}
        </DialogHeader>
        <DialogClose>
          <div className="flex flex-row justify-center gap-3">
            <Button variant="outline" className={cn("sm:w-32 sm:p-5", cancelButtonClassName)} onClick={() => setIsOpen(false)}>
              No
            </Button>
            <Button
              className={cn("sm:w-32 sm:p-5", submitButtonClassName)}
              onClick={onConfirm}
              type={buttonType}
              disabled={isLoading}>
              {isLoading && <LoaderCircle className="mr-3 h-5 w-5 animate-spin" />}
              Yes
            </Button>
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
