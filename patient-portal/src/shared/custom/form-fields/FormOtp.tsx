import React from "react";

import { type Control, type FieldValues, type Path } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/shadcn/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "~/shared/shadcn/ui/input-otp";

interface FormOtpProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  maxLength: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  onChange?: () => void;
  labelClassName?: string;
}

const FormOtp = <T extends FieldValues>({
  control,
  label,
  className,
  name,
  maxLength,
  step = 2,
  required,
  disabled,
  onChange,
  labelClassName,
}: FormOtpProps<T>) => {
  const noGrouping = !step || step <= 0;

  const groups = Math.ceil(maxLength / step);

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel className={labelClassName}>
            {label}
            {required && <span className="ml-1 text-red-600">*</span>}
          </FormLabel>
          <FormControl>
            {noGrouping ? (
              <InputOTP
                maxLength={maxLength}
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.();
                }}
              >
                <InputOTPGroup>
                  {Array.from({ length: maxLength }).map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            ) : (
              <InputOTP
                maxLength={maxLength}
                disabled={disabled}
                {...field}
                onChange={(e) => {
                  field.onChange(e);
                  onChange?.();
                }}
              >
                {Array.from({ length: groups }).map((_, groupIndex) => (
                  <React.Fragment key={groupIndex}>
                    <InputOTPGroup>
                      {Array.from({ length: step }).map((_, slotIndex) => {
                        const index = groupIndex * step + slotIndex;
                        if (index >= maxLength) return null; // avoid extra slots
                        return (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="text-xs sm:text-sm"
                          />
                        );
                      })}
                    </InputOTPGroup>
                    {groupIndex < groups - 1 && <InputOTPSeparator />}
                  </React.Fragment>
                ))}
              </InputOTP>
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormOtp;
