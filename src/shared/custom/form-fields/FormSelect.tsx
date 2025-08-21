import React from "react";

import { Button } from "~/shared/shadcn/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/shadcn/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/shared/shadcn/ui/select";

import { cn } from "~/lib/utils";

import {
  useFormContext,
  type Control,
  type FieldValues,
  type Path,
} from "react-hook-form";

interface FormSelectProps<T extends FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  selectOptions: { value: string; name: string }[];
  placeholder?: string;
  className?: string;
  onChange?: (value: string) => void;
  required?: boolean;
  value?: string;
  disabled?: boolean;
  testId?: string;
  isLoading?: boolean;
  noDataMessage?: string;
  defaultValue?: string;
  selectClassName?: string;
  backToDefault?: boolean;
  openSelect?: boolean;
  setOpenSelect?: React.Dispatch<React.SetStateAction<boolean>>;
  showRequiredMessage?: boolean;
  labelClassName?: string;
  optionClassName?: string;
  triggerSize?: "sm" | "default" | "xs";
}
const FormSelect = <T extends FieldValues>({
  name,
  control,
  label,
  selectOptions,
  placeholder,
  className,
  onChange,
  required,
  disabled,
  testId,
  isLoading,
  noDataMessage,
  defaultValue,
  selectClassName,
  backToDefault = true,
  openSelect,
  setOpenSelect,
  showRequiredMessage = true,
  labelClassName,
  optionClassName,
  triggerSize = "default",
}: FormSelectProps<T>) => {
  const formContext = useFormContext();
  const { resetField } = formContext;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>
            {label} {required && <span className="text-red-600">*</span>}
          </FormLabel>
          <div className="relative">
            <Select
              open={openSelect ?? undefined}
              onOpenChange={setOpenSelect ?? undefined}
              disabled={disabled}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                onChange?.(value);
              }}
              defaultValue={defaultValue}
            >
              <FormControl>
                <SelectTrigger className={cn("w-full", selectClassName)} size={triggerSize}>
                  <div className={cn("flex flex-row items-center gap-2")}>
                    <SelectValue
                      data-testid={testId}
                      placeholder={placeholder ?? "Select"}
                    />
                  </div>
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {isLoading ? (
                  <div className="p-2 text-center text-sm">Loading...</div>
                ) : selectOptions?.length === 0 ? (
                  <div className="p-2 text-center text-sm">{noDataMessage}</div>
                ) : (
                  selectOptions?.map((option, index) => (
                    <SelectItem
                      key={index}
                      value={option.value}
                      className={optionClassName}
                    >
                      {option.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {field.value && backToDefault && (
              <Button
                type="button"
                variant={"ghost"}
                className="text-muted-foreground absolute top-1/2 right-0 -translate-y-1/2 transform bg-transparent text-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  resetField(name as string, {
                    defaultValue: null,
                  });
                }}
              >
                &times;
              </Button>
            )}
          </div>
          {showRequiredMessage && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default FormSelect;
