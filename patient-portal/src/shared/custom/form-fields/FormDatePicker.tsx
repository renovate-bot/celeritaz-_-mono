"use client";

import { differenceInMonths, differenceInYears } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type Path } from "react-hook-form";

import { Button } from "~/shared/shadcn/ui/button";
import { Calendar } from "~/shared/shadcn/ui/calendar";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/shared/shadcn/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "~/shared/shadcn/ui/popover";

import type { Control, FieldValues } from "react-hook-form";

import "react-day-picker/dist/style.css";

import { useState } from "react";

import moment from "moment";

import { cn } from "~/lib/utils";

interface FormDatePickerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
  className?: string;
  placeholder?: string;
  required?: boolean;
  futureDate?: boolean;
  futureDateValue?: Date;
  showDistanceToNow?: boolean;
  dateFormat?: string;
  fromYear?: number;
  toYear?: number;
  disabled?: boolean;
  onSelect?: (d?: Date) => void;
  labelClassName?: string;
  calendarClassName?: string;
}

//const formattedDate = format(today, "yyyy-MM-dd");
const FormDatePicker = <T extends FieldValues>({
  control,
  label,
  className,
  placeholder = "Choose Date",
  name,
  required,
  dateFormat = "DD-MMM-yyyy",
  fromYear = 1920,
  toYear = new Date().getFullYear(),
  futureDate,
  futureDateValue,
  showDistanceToNow = false,
  disabled,
  onSelect,
  labelClassName,
  calendarClassName,
}: FormDatePickerProps<T>) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [age, setAge] = useState<{ years: number; months: number } | null>(
    null,
  );

  const calculateAge = (selectedDate: Date) => {
    const now = new Date();
    const years = differenceInYears(now, selectedDate);
    const months = differenceInMonths(now, selectedDate) % 12;
    setAge({ years, months });
  };
  const today = new Date();

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn(labelClassName)}>
            {label}
            {required && <span className="sm:ml-1 text-red-600">*</span>}
          </FormLabel>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  ref={field.ref}
                  variant={"outline"}
                  className={cn(
                    "w-full text-left font-normal lg:min-w-40",
                    className,
                    "hover:border-ring hover:bg-background focus:ring-ring focus:ring-1",
                    !field.value && "text-muted-foreground",
                  )}
                >
                  {field.value && moment(field.value).isValid() ? (
                    moment(field.value).format(dateFormat)
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                captionLayout="dropdown-years"
                className={cn(calendarClassName)}
                fromYear={fromYear}
                toYear={toYear}
                onDayClick={(selectedDate) => {
                  const utcDate = moment(selectedDate)
                    .startOf("day") // Ensure the time is set to midnight
                    .utcOffset(0, true) // Adjust for UTC without shifting the time
                    .toDate();
                  field.onChange(utcDate); // Update the form field with the selected date
                  setIsCalendarOpen(false); // Close the calendar popover
                  if (showDistanceToNow && selectedDate) {
                    calculateAge(selectedDate);
                  }
                }}
                onSelect={(e) => {
                  onSelect?.(e);
                  field.onChange(e);
                  setIsCalendarOpen(false);
                  if (showDistanceToNow && e) {
                    calculateAge(e);
                  }
                }}
                disabled={(date) =>
                  futureDate
                    ? date < (futureDateValue ?? today)
                    : date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              />
              {/* <Calendar
                mode="single"
                selected={field.value}
                onDayClick={(selectedDate) => {
                  const utcDate = moment(selectedDate)
                    .startOf("day") // Ensure the time is set to midnight
                    .utcOffset(0, true) // Adjust for UTC without shifting the time
                    .toDate();
                  field.onChange(utcDate); // Update the form field with the selected date
                  setIsCalendarOpen(false); // Close the calendar popover
                  if (showDistanceToNow && selectedDate) {
                    calculateAge(selectedDate);
                  }
                }}
                className="!m-0 w-full rounded-md border"
                disabled={(date) =>
                  futureDate
                    ? date < (futureDateValue ? futureDateValue : today)
                    : date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
              /> */}
            </PopoverContent>
          </Popover>
          {showDistanceToNow && age !== null && (
            <p className="text-xs">
              Age: {age.years} years and {age.months} months
            </p>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default FormDatePicker;
