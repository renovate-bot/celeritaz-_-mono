import React, { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, ChevronDown, Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { api } from "~/trpc/react";

import FormDatePicker from "~/shared/custom/form-fields/FormDatePicker";
import FormInput from "~/shared/custom/form-fields/FormInput";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
import { Button } from "~/shared/shadcn/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "~/shared/shadcn/ui/command";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "~/shared/shadcn/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "~/shared/shadcn/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/shared/shadcn/ui/popover";
import { ScrollArea } from "~/shared/shadcn/ui/scroll-area";

import { INSURANCE_COMPANIES, PAYER_TYPES } from "~/lib/constants";
import { cn } from "~/lib/utils";

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  payerId: z.string().optional(),
  patientId: z.string(),
  name: z.string({ required_error: "Required" }).optional(),
  selection: z.string({ required_error: "Required" }).optional(),
  type: z.string().optional(),
  group: z.string().optional(),
  subGroup: z.string().optional(),
  insuranceCompany: z.string().optional(),
  policyNumber: z.string().optional(),
  policyLimit: z.string().optional(),
  scheme: z.string().optional(),
  applicationFromDate: z.coerce.date().optional(),
  applicationToDate: z.coerce.date().optional()
});

const EditPayer = ({ data }: { data: PatientCompleteData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { setValue, resetField, control } = form;
  const [comboBox1, setComboBox1] = useState(false);
  const [comboBox2, setComboBox2] = useState(false);
  console.log(JSON.stringify(form.formState.errors, null, 2));
  const editMutation = api.patient.editPayerDetails.useMutation({
    onSuccess: () => {
      toast.success("Payer information updated successfully", {
        description: "Your payer information has been updated successfully"
      });
    },
    onError: () => {
      toast.error("Failed to update payer information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    form.reset({
      payerId: data?.payerDetailsData?.id ?? undefined,
      patientId: data?.demographicDetails?.patientId ?? "",
      name: data?.payerDetailsData?.name ?? undefined,
      selection: data?.payerDetailsData?.selection ?? undefined,
      type: data?.payerDetailsData?.type ?? undefined,
      group: data?.payerDetailsData?.group ?? undefined,
      subGroup: data?.payerDetailsData?.subGroup ?? undefined,
      insuranceCompany: data?.payerDetailsData?.insuranceCompany ?? undefined,
      policyNumber: data?.payerDetailsData?.policyNumber ?? undefined,
      policyLimit: data?.payerDetailsData?.policyLimit ?? undefined,
      scheme: data?.payerDetailsData?.scheme ?? undefined,
      applicationFromDate: data?.payerDetailsData?.applicationFromDate ?? undefined,
      applicationToDate: data?.payerDetailsData?.applicationToDate ?? undefined
    });
  }, [form, data]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    await editMutation.mutateAsync(data);
  };

  return (
    <Dialog>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogTrigger asChild>
            <Pen size={10} className="text-muted-foreground cursor-pointer duration-200" />
          </DialogTrigger>
          <DialogContent className="w-[270px] p-2 pr-0.5 sm:max-w-[425px]">
            <DialogTitle className="text-primary items-start text-xs font-medium sm:text-sm">
              Edit Payer Information
            </DialogTitle>
            <ScrollArea className="h-[300px] w-full">
              <div className="grid grid-cols-1 gap-3 pr-3">
                <FormField
                  control={control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0.5">
                      <FormLabel className="text-[9px] sm:text-sm">
                        Payer Name <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="relative">
                        <Popover open={comboBox1} onOpenChange={setComboBox1}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={
                                  "h-7 w-full justify-between p-2 text-[9px] font-normal sm:text-sm"
                                }>
                                {field.value
                                  ? PAYER_TYPES?.find((type) => type.value === field.value)?.name
                                  : "Select Payer Name"}
                                {!field.value && (
                                  <ChevronDown className="ml-2 size-3 shrink-0 opacity-50" />
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-60 p-0 xl:w-[26rem]">
                            <Command>
                              <CommandInput
                                className="text-[9px] sm:text-sm"
                                placeholder="Search Payer Name..."
                              />
                              <CommandList>
                                <CommandEmpty className="py-6 text-center text-[9px] font-semibold sm:text-sm">
                                  No Payer Name found.
                                </CommandEmpty>
                                <CommandGroup className="mr-1">
                                  {PAYER_TYPES?.map((type) => (
                                    <CommandItem
                                      className="flex items-center justify-between text-[9px] sm:text-sm"
                                      value={type.name}
                                      key={type.value}
                                      onSelect={() => {
                                        setValue("name", type.value);
                                        setValue("type", type.type);
                                        setValue("group", type.group);
                                        setValue("subGroup", type.subGroup);
                                        setComboBox1(false);
                                      }}>
                                      {type.name}
                                      <Check
                                        className={cn(
                                          "h-3 w-3",
                                          type.value === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {field.value && (
                          <Button
                            type="button"
                            variant={"ghost"}
                            className="text-muted-foreground absolute top-1/2 right-0 h-7 -translate-y-1/2 transform bg-transparent text-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              resetField("name", {
                                defaultValue: ""
                              });
                            }}>
                            &times;
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSelect
                  control={control}
                  label="Payer Selection"
                  name="selection"
                  defaultValue="single_payer"
                  required
                  selectOptions={[
                    { name: "Single Payer", value: "single_payer" },
                    { name: "Co-Payer", value: "co_payer" }
                  ]}
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] h-5 sm:text-sm p-2"
                  optionClassName="text-[9px] h-5 sm:text-sm p-2"
                  backToDefault={false}
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="type"
                  label="Payer Type"
                  placeholder="Payer Type"
                  disabled
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="group"
                  label="Payer Group"
                  placeholder="Payer Group"
                  disabled
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="subGroup"
                  label="Payer Sub Group"
                  placeholder="Payer Sub Group"
                  disabled
                />
                <FormField
                  control={control}
                  name="insuranceCompany"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-0.5">
                      <FormLabel className="text-[9px] sm:text-sm">
                        Insurance Company <span className="text-destructive">*</span>
                      </FormLabel>
                      <div className="relative">
                        <Popover open={comboBox2} onOpenChange={setComboBox2}>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={
                                  "h-7 w-full justify-between p-2 text-[9px] font-normal sm:text-sm"
                                }>
                                {field.value
                                  ? INSURANCE_COMPANIES.map((item) => {
                                      return {
                                        name: item,
                                        value: item
                                      };
                                    })?.find((type) => type.value === field.value)?.name
                                  : "Select Insurance Company"}
                                {!field.value && (
                                  <ChevronDown className="ml-2 size-3 shrink-0 opacity-50" />
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-60 p-0 xl:w-[26rem]">
                            <Command>
                              <CommandInput
                                className="text-[9px] sm:text-sm"
                                placeholder="Search Payer Name..."
                              />
                              <CommandList>
                                <CommandEmpty className="py-6 text-center text-[9px] font-semibold sm:text-sm">
                                  No Insurance Company found.
                                </CommandEmpty>
                                <CommandGroup className="mr-1">
                                  {INSURANCE_COMPANIES?.map((item) => {
                                    return {
                                      name: item,
                                      value: item
                                    };
                                  })?.map((type) => (
                                    <CommandItem
                                      className="flex items-center justify-between text-[9px] sm:text-sm"
                                      value={type.name}
                                      key={type.value}
                                      onSelect={() => {
                                        setValue("insuranceCompany", type.value);
                                        setComboBox2(false);
                                      }}>
                                      {type.name}
                                      <Check
                                        className={cn(
                                          "h-3 w-3",
                                          type.value === field.value ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        {field.value && (
                          <Button
                            type="button"
                            variant={"ghost"}
                            className="text-muted-foreground absolute top-1/2 right-0 h-7 -translate-y-1/2 transform bg-transparent text-lg"
                            onClick={(e) => {
                              e.stopPropagation();
                              resetField("insuranceCompany", {
                                defaultValue: ""
                              });
                            }}>
                            &times;
                          </Button>
                        )}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="policyNumber"
                  label="Email Address"
                  placeholder="Email Address"
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="policyLimit"
                  label="Policy Limit"
                  placeholder="Policy Limit"
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="scheme"
                  label="Scheme"
                  placeholder="Scheme"
                />
                <FormDatePicker
                  control={control}
                  labelClassName="text-[9px] sm:text-sm"
                  className="h-7 px-2 text-[9px] sm:text-sm"
                  label="Application From Date"
                  name="applicationFromDate"
                />
                <FormDatePicker
                  control={control}
                  labelClassName="text-[9px] sm:text-sm"
                  className="h-7 px-2 text-[9px] sm:text-sm"
                  label="Application To Date"
                  name="applicationToDate"
                />
              </div>
            </ScrollArea>
            <DialogFooter className="flex w-full flex-row items-center justify-center gap-2 pr-1">
              <DialogClose asChild>
                <Button size={"xs"} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                size={"xs"}
                type="submit"
                onClick={() => form.handleSubmit(onSubmit)}
                disabled={editMutation.isPending}
              >
                Update
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Form>
    </Dialog>
  );
};

export default EditPayer;
