import React, { useState } from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "~/shared/shadcn/ui/form";
import { Input } from "~/shared/shadcn/ui/input";
import { Label } from "~/shared/shadcn/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/shadcn/ui/select";

import { cn } from "~/lib/utils";

import type { Control, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  inputClassName?: string;
  inputName: Path<T>;
  selectName: Path<T>;
  selectOptions: string[];
  label?: string;
  required?: boolean;
  placeholder?: string;
  inputType?: string;
  noBorder?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  inputValue?: string;
  openSelect?: boolean;
  setOpenSelect?: React.Dispatch<React.SetStateAction<boolean>>;
  inputDefaultValue?: string;
}

export default function InputWithSelect<T extends FieldValues>({
  control,
  inputName,
  inputClassName,
  selectOptions,
  selectName,
  label,
  required,
  placeholder,
  inputType,
  noBorder,
  disabled,
  onChange,
  inputValue,
  openSelect,
  setOpenSelect,
  inputDefaultValue,
}: InputFieldProps<T>) {
  const [open, setOpen] = useState(openSelect);
  return (
    <div className="flex items-center">
      <Label className="text-sm">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </Label>
      <div className="flex items-start gap-0">
        <FormField
          control={control}
          name={inputName}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className={cn(
                    !noBorder &&
                      "max-w-20 rounded-none focus-visible:ring-transparent",
                    noBorder &&
                      "bg-background min-w-6 border-0 p-0 py-0 pt-0 text-start shadow-none",
                    inputClassName,
                  )}
                  {...field}
                  onChange={(e) => {
                    field.onChange(e);
                    onChange?.();
                  }}
                  value={inputValue ?? (field.value as string)}
                  placeholder={placeholder}
                  type={inputType ?? "text"}
                  disabled={disabled}
                  defaultValue={inputDefaultValue ?? undefined}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name={selectName}
          render={({ field }) => (
            <FormItem>
              <Select
                open={openSelect}
                onOpenChange={setOpenSelect}
                disabled={disabled}
                onValueChange={(e) => {
                  field.onChange(e);
                  onChange?.();
                }}
                defaultValue={selectOptions[0]}
              >
                <FormControl>
                  <SelectTrigger
                    className={cn(
                      !noBorder &&
                        "min-w-20 rounded-none bg-gray-100 dark:bg-slate-800",
                      noBorder &&
                        "min-w-28 border-0 p-0 shadow-none focus-visible:ring-transparent",
                    )}
                  >
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {selectOptions.map((option, index) => (
                    <SelectItem key={index} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
