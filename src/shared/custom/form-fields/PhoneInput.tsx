import React from "react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/shared/shadcn/ui/form";
import { PhoneInput } from "~/shared/shadcn/ui/phone-input";

import { cn } from "~/lib/utils";

import type { Control, FieldValues, Path } from "react-hook-form";
import type * as RPNInput from "react-phone-number-input";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  value?: string;
  placeholder: string;
  className?: string;
  required?: boolean;
  type?: string;
  testId?: string;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: () => void;
  leftIcon?: string;
  rightIcon?: string;
  countryCode?: RPNInput.Country;
  labelClassName?: string;
  phoneInputClassName?: string;
}
const PhoneInputField = <T extends FieldValues>({
  control,
  name,
  label,
  maxLength,
  placeholder,
  className,
  required,
  countryCode,
  labelClassName,
  phoneInputClassName
}: InputFieldProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        return (
          <FormItem className={cn(className)}>
            <FormLabel className={cn(labelClassName)}>
              {label}
              {required && <span className="sm:ml-1 text-red-600">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <PhoneInput
                  countryCode={countryCode}
                  maxLength={maxLength}
                  placeholder={placeholder}
                  className={phoneInputClassName}
                  {...field}
                />
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default PhoneInputField;
