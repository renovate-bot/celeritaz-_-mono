import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/shared/shadcn/ui/form";
import { Textarea } from "~/shared/shadcn/ui/textarea";

import { cn } from "~/lib/utils";

import type { Control, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  value?: string;
  placeholder: string;
  textClassName?: string;
  className?: string;
  required?: boolean;
  type?: string;
  disabled?: boolean;
}
const FormTextarea = <T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  className,
  textClassName,
  required,
  disabled = false
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn(className)}>
            <FormLabel>
              {label}
              {required && <span className="ml-1 text-red-600">*</span>}
            </FormLabel>
            <FormControl>
              <Textarea
                disabled={disabled}
                placeholder={placeholder}
                value={field.value as string}
                onFocus={() => {
                  if (!field.value || field.value === "") {
                    field.onChange("1. "); // Start numbering when focused if the textarea is empty
                  }
                }}
                onChange={field.onChange}
                className={cn(textClassName, "h-32")}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // Prevent the default action of creating a new line

                    const currentValue = String(field.value ?? "");
                    const currentLines = currentValue.split("\n");

                    // Continue numbering for new lines
                    const newNumber = currentLines.length + 1;
                    const newValue = `${currentValue}\n${newNumber}. `; // Add a new line with numbering
                    field.onChange(newValue);
                  }
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default FormTextarea;
