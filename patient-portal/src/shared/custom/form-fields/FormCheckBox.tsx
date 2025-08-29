import React from "react";

import { type Path } from "react-hook-form";

import { Checkbox } from "~/shared/shadcn/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/shadcn/ui/form";

import { cn } from "~/lib/utils";

import type { Control, FieldValues } from "react-hook-form";

interface FormCheckBoxInterface<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  disable?: boolean;
  labelClassName?: string;
  onChange?: () => void;
  checkboxClassName?: string;
}
const FormCheckBox = <T extends FieldValues>({
  control,
  name,
  label,
  className,
  disable,
  labelClassName,
  checkboxClassName,
  onChange,
}: FormCheckBoxInterface<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem
            className={cn("flex w-full items-center space-y-0", className)}
          >
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={(value) => {
                  field.onChange(value);
                  onChange?.();
                }}
                disabled={disable}
                className={checkboxClassName}
              />
            </FormControl>
            {label && <FormLabel className={cn("y-0 ml-2", labelClassName)}>{label}</FormLabel>}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormCheckBox;
