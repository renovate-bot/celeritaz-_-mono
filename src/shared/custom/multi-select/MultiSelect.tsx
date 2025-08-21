// src/components/multi-select.tsx

import * as React from "react";

import { cva } from "class-variance-authority";
import { CheckIcon, ChevronDown, XCircle, XIcon } from "lucide-react";

import { Badge } from "~/shared/shadcn/ui/badge";
import { Button } from "~/shared/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from "~/shared/shadcn/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/shadcn/ui/popover";
import { Separator } from "~/shared/shadcn/ui/separator";

import { cn } from "~/lib/utils";

import ShortenedName from "../shortened-name";

import type { VariantProps } from "class-variance-authority";

/**
 * Variants for the multi-select component to handle different styles.
 * Uses class-variance-authority (cva) to define different styles based on "variant" prop.
 */
const multiSelectVariants = cva(
  "m-1 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300",
  {
    variants: {
      variant: {
        default: "border-foreground/10 text-foreground bg-card hover:bg-card/80",
        secondary:
          "border-foreground/10 bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        inverted: "inverted"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

/**
 * Props for MultiSelect component
 */
interface MultiSelectProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof multiSelectVariants> {
  /**
   * An array of option objects to be displayed in the multi-select component.
   * Each option object has a label, value, and an optional icon.
   */
  options: {
    /** The text to display for the option. */
    label: string;
    /** The unique value associated with the option. */
    value: string;
    /** Optional icon component to display alongside the option. */
    icon?: React.ComponentType<{ className?: string }>;
  }[];

  /**
   * Callback function triggered when the selected values change.
   * Receives an array of the new selected values.
   */
  onValueChange: (value: string[]) => void;

  /** The default selected values when the component mounts. */
  defaultValue?: string[];
  includeInputValue?: boolean;

  /**
   * Placeholder text to be displayed when no values are selected.
   * Optional, defaults to "Select options".
   */
  placeholder?: string;

  /**
   * Animation duration in seconds for the visual effects (e.g., bouncing badges).
   * Optional, defaults to 0 (no animation).
   */
  animation?: number;

  /**
   * Maximum number of items to display. Extra selected items will be summarized.
   * Optional, defaults to 3.
   */
  maxCount?: number;

  /**
   * The modality of the popover. When set to true, interaction with outside elements
   * will be disabled and only popover content will be visible to screen readers.
   * Optional, defaults to false.
   */
  modalPopover?: boolean;

  /**
   * If true, renders the multi-select component as a child of another component.
   * Optional, defaults to false.
   */
  asChild?: boolean;

  /**
   * Additional class names to apply custom styles to the multi-select component.
   * Optional, can be used to add custom styles.
   */
  className?: string;
  contentClassName?: string; // className for the popover content
  showActions?: boolean;
  size?: "xs";
}

export const MultiSelect = React.forwardRef<HTMLButtonElement, MultiSelectProps>(
  (
    {
      options,
      onValueChange,
      variant,
      defaultValue = [],
      placeholder = "Select options",
      animation = 0,
      maxCount = 3,
      modalPopover = false,
      asChild = false,
      className,
      contentClassName,
      size,
      showActions = true,
      includeInputValue = false,
      ...props
    },
    ref
  ) => {
    const [selectedValues, setSelectedValues] = React.useState<string[]>(defaultValue);
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false);
    const [searchInput, setSearchInput] = React.useState("");

    React.useEffect(() => {
      if (JSON.stringify(selectedValues) !== JSON.stringify(defaultValue)) {
        setSelectedValues(selectedValues);
      }
    }, [defaultValue, selectedValues]);

    const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        setIsPopoverOpen(true);
      } else if (event.key === "Backspace" && !event.currentTarget.value) {
        const newSelectedValues = [...selectedValues];
        newSelectedValues.pop();
        setSelectedValues(newSelectedValues);
        onValueChange(newSelectedValues);
      }
    };

    const toggleOption = (value: string) => {
      const newSelectedValues = selectedValues.includes(value)
        ? selectedValues.filter((v) => v !== value)
        : [...selectedValues, value];
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const handleClear = () => {
      setSelectedValues([]);
      onValueChange([]);
    };

    const handleTogglePopover = () => {
      setIsPopoverOpen((prev) => !prev);
    };

    const clearExtraOptions = () => {
      const newSelectedValues = selectedValues.slice(0, maxCount);
      setSelectedValues(newSelectedValues);
      onValueChange(newSelectedValues);
    };

    const toggleAll = () => {
      if (selectedValues.length === options.length) {
        handleClear();
      } else {
        const allValues = options.map((option) => option.value);
        setSelectedValues(allValues);
        onValueChange(allValues);
      }
    };
    return (
      <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen} modal={modalPopover}>
        <PopoverTrigger asChild>
          <Button
            ref={ref}
            {...props}
            onClick={handleTogglePopover}
            className={cn(
              "ring-offset-background placeholder:text-muted-foreground flex w-full items-center justify-between rounded-md border bg-inherit p-1 shadow-sm hover:bg-inherit sm:h-auto sm:min-h-9",
              size === "xs" && "h-7 p-0 text-[9px] sm:text-sm",
              className
            )}>
            {selectedValues.length > 0 ? (
              <div className="flex w-full items-center justify-between">
                <div className="flex flex-wrap items-center">
                  {selectedValues.slice(0, maxCount).map((value) => {
                    const option = options.find((o) => o.value === value);
                    const IconComponent = option?.icon;
                    return (
                      <Badge
                        key={value}
                        className={cn(
                          multiSelectVariants({ variant }),
                          size === "xs" && "text-[7px] sm:text-sm"
                        )}>
                        {IconComponent && <IconComponent className="mr-2 h-4 w-4" />}
                        <ShortenedName firstName={option?.label ?? value} nameLength={10} />
                        {/* {option?.label} */}
                        <XCircle
                          className={cn("ml-2 h-4 w-4 cursor-pointer", size === "xs" && "size-3")}
                          onClick={(event) => {
                            event.stopPropagation();
                            toggleOption(value);
                          }}
                        />
                      </Badge>
                    );
                  })}
                  {selectedValues.length > maxCount && (
                    <Badge
                      className={cn(
                        "border-foreground/1 text-foreground bg-transparent hover:bg-transparent",
                        multiSelectVariants({ variant }),
                        size === "xs" && "text-[7px] sm:text-sm"
                      )}
                      style={{ animationDuration: `${animation}s` }}>
                      {`+ ${selectedValues.length - maxCount} more`}
                      <XCircle
                        className={cn("ml-2 h-3 w-4 cursor-pointer", size === "xs" && "size-3")}
                        onClick={(event) => {
                          event.stopPropagation();
                          clearExtraOptions();
                        }}
                      />
                    </Badge>
                  )}
                </div>
                {showActions && (
                  <div className="flex items-center justify-between">
                    <XIcon
                      className={cn("text-foreground mx-2 h-3 w-4 cursor-pointer", size === "xs" && "size-3")}
                      onClick={(event) => {
                        event.stopPropagation();
                        handleClear();
                      }}
                    />
                    <Separator orientation="vertical" className="flex h-full min-h-6" />
                    <ChevronDown className={cn("text-foreground mx-2 h-3 cursor-pointer", size === "xs" && "size-3")} />
                  </div>
                )}
              </div>
            ) : (
              <div className="mx-auto flex w-full items-center justify-between">
                <span
                  className={cn(
                    "text-muted-foreground mx-2 text-sm",
                    size === "xs" && "text-[9px] sm:text-sm"
                  )}>
                  {placeholder}
                </span>
                <ChevronDown className="text-foreground mx-2 size-3 cursor-pointer sm:h-3 sm:w-4" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className={cn("w-auto p-0", contentClassName)}
          align="start"
          onEscapeKeyDown={() => setIsPopoverOpen(false)}>
          <Command>
            <CommandInput
              placeholder="Search..."
              className={cn(size === "xs" && "text-[9px] sm:text-sm")}
              onKeyDown={handleInputKeyDown}
              onValueChange={(input) => setSearchInput(input)}
            />
            <CommandList>
              <CommandEmpty className={cn(size === "xs" && "text-[9px] sm:text-sm")}>
                No results found.
              </CommandEmpty>
              <CommandGroup>
                <CommandItem key="all" onSelect={toggleAll} className="cursor-pointer">
                  <div
                    className={cn(
                      "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                      selectedValues.length === options.length
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50 [&_svg]:invisible",
                      size === "xs" && "size-3"
                    )}>
                    <CheckIcon className="size-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className={cn(size === "xs" && "text-[9px] sm:text-sm")}>(Select All)</span>
                </CommandItem>
                {options.map((option) => {
                  const isSelected = selectedValues.includes(option.value);
                  return (
                    <CommandItem
                      key={option.value}
                      onSelect={() => toggleOption(option.value)}
                      className="cursor-pointer">
                      <div
                        className={cn(
                          "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                          size === "xs" && "size-3"
                        )}>
                        <CheckIcon className="size-3 sm:h-4 sm:w-4" />
                      </div>
                      {option.icon && (
                        <option.icon
                          className={cn(
                            "text-muted-foreground mr-2 h-4 w-4",
                            size === "xs" && "size-3"
                          )}
                        />
                      )}
                      <span className={cn(size === "xs" && "text-[9px] sm:text-sm")}>
                        {option.label}
                      </span>
                    </CommandItem>
                  );
                })}
                {includeInputValue ? (
                  <CommandItem
                    key={searchInput}
                    value={searchInput}
                    onSelect={() => toggleOption(searchInput)}>
                    <div
                      className={cn(
                        "border-primary mr-2 flex h-4 w-4 items-center justify-center rounded-sm border",
                        selectedValues.includes(searchInput)
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible",
                        size === "xs" && "size-3"
                      )}>
                      <CheckIcon className="size-3 sm:h-4 sm:w-4" />
                    </div>
                    <span className={cn(size === "xs" && "text-[9px] sm:text-sm")}>
                      {searchInput}
                    </span>
                    {/* {searchInput} */}
                  </CommandItem>
                ) : (
                  <CommandEmpty className={cn(size === "xs" && "text-[9px] sm:text-sm")}>
                    No Results
                  </CommandEmpty>
                )}
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between">
                  {selectedValues.length > 0 && (
                    <>
                      <CommandItem
                        onSelect={handleClear}
                        className="flex-1 cursor-pointer justify-center">
                        <span className={cn(size === "xs" && "text-[9px] sm:text-sm")}>Clear</span>
                      </CommandItem>
                      <Separator orientation="vertical" className="flex h-full min-h-6" />
                    </>
                  )}
                  <CommandItem
                    onSelect={() => setIsPopoverOpen(false)}
                    className="max-w-full flex-1 cursor-pointer justify-center">
                    <span className={cn(size === "xs" && "text-[9px] sm:text-sm")}>Close</span>
                  </CommandItem>
                </div>
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    );
  }
);

MultiSelect.displayName = "MultiSelect";
