import React from "react";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/shadcn/ui/form";
import { Input } from "~/shared/shadcn/ui/input";

import { cn } from "~/lib/utils";

import type { Control, FieldValues, Path } from "react-hook-form";

interface InputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  value?: string | number;
  inputValue?: (value: string | number) => string | number | undefined;
  placeholder: string;
  className?: string;
  labelClassName?: string;
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
  inputClassName?: string;
  fixedValue?: string;
  showFormMessage?: boolean;
  autoFocus?: boolean;
}
const FormInput = <T extends FieldValues>({
  control,
  name,
  label,
  maxLength,
  labelClassName,
  value,
  placeholder,
  className,
  required,
  type,
  testId,
  min,
  max,
  step,
  disabled,
  onChange,
  inputValue,
  leftIcon,
  rightIcon,
  inputClassName,
  fixedValue,
  showFormMessage = true,
  autoFocus = false,
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
              {required && <span className="ml-1 text-red-600">*</span>}
            </FormLabel>
            <FormControl>
              <div className="relative">
                {leftIcon && (
                  <div className="absolute inset-y-0 left-0 flex items-center px-3">
                    <span className="text-muted-foreground">{leftIcon}</span>
                  </div>
                )}
                <Input
                  data-testid={testId}
                  type={type ?? "text"}
                  placeholder={placeholder}
                  autoFocus={autoFocus}
                  {...field}
                  min={min}
                  max={max}
                  step={step}
                  maxLength={maxLength}
                  disabled={disabled}
                  value={value ?? inputValue?.(field?.value) ?? field.value}
                  onChange={(e) => {
                    if (type == "number") {
                      field.onChange(+e.target.value);
                    } else {
                      field.onChange(e);
                    }
                    onChange?.();
                  }}
                  className={cn(inputClassName, leftIcon && "pl-6")}
                />
                {rightIcon && (
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                    <span className="text-muted-foreground">{rightIcon}</span>
                  </div>
                )}
              </div>
            </FormControl>
            {showFormMessage && <FormMessage />}
          </FormItem>
        );
      }}
    />
  );
};

export default FormInput;
