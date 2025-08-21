import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { api } from "~/trpc/react";

import FormInput from "~/shared/custom/form-fields/FormInput";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
import PhoneInputField from "~/shared/custom/form-fields/PhoneInput";
import { Button } from "~/shared/shadcn/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "~/shared/shadcn/ui/dialog";
import { Form } from "~/shared/shadcn/ui/form";
import { ScrollArea } from "~/shared/shadcn/ui/scroll-area";

import { countries, EmployeeRelations, states } from "~/lib/constants";

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  id: z.string().optional(),
  patientId: z.string(),
  employeeId: z.string().optional(),
  mobileNumber: z.string().optional(),
  email: z.string().optional(),
  relationship: z.string().optional(),
  employerName: z.string().optional(),
  employerMobileNumber: z.string().optional(),
  employerEmail: z.string().optional(),
  employerArea: z.string().optional(),
  employerPincode: z.string().optional(),
  employerCity: z.string().optional(),
  employerState: z.string().optional(),
  employerCountry: z.string().optional()
});

const EditEmployer = ({ data }: { data: PatientCompleteData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { control } = form;
  console.log(JSON.stringify(form.formState.errors, null, 2));

  const editMutation = api.patient.editEmployerDetails.useMutation({
    onSuccess: () => {
      toast.success("Employer information updated successfully", {
        description: "Your employer information has been updated successfully"
      });
    },
    onError: () => {
      toast.error("Failed to update employer information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    form.reset({
      id: data?.employerDetailsData?.id ?? undefined,
      patientId: data?.demographicDetails?.patientId ?? "",
      employeeId: data?.employerDetailsData?.employeeId ?? undefined,
      mobileNumber: data?.employerDetailsData?.employeeMobileNumber ?? undefined,
      email: data?.employerDetailsData?.employeeEmail ?? undefined,
      relationship: data?.employerDetailsData?.relationship ?? undefined,
      employerName: data?.employerDetailsData?.employerName ?? undefined,
      employerMobileNumber: data?.employerDetailsData?.employerMobileNumber ?? undefined,
      employerEmail: data?.employerDetailsData?.employerEmail ?? undefined,
      employerArea: data?.employerDetailsData?.employerArea ?? undefined,
      employerPincode: data?.employerDetailsData?.employerPincode ?? undefined,
      employerCity: data?.employerDetailsData?.employerCity ?? undefined,
      employerState: data?.employerDetailsData?.employerState ?? undefined,
      employerCountry: data?.employerDetailsData?.employerCountry ?? undefined
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
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="employeeId"
                  label="Employee ID"
                  placeholder="Employee ID"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="email"
                  label="Employee Email"
                  placeholder="Employee Email"
                />
                <PhoneInputField
                  control={form.control}
                  name="mobileNumber"
                  label="Employee Mobile Number"
                  placeholder="Employee Mobile Number"
                  className="w-full"
                  labelClassName="text-[9px] sm:text-sm"
                />
                <FormSelect
                  control={form.control}
                  name="relationship"
                  label="Relation"
                  selectOptions={EmployeeRelations.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  className="gap-0.5 text-[9px] sm:text-sm"
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
                  name="employerName"
                  label="Employer Name"
                  placeholder="Employer Name"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="employerEmail"
                  label="Employer Email"
                  placeholder="Employer Email"
                />
                <PhoneInputField
                  control={form.control}
                  name="employerMobileNumber"
                  label="Employer Mobile Number"
                  placeholder="Employer Mobile Number"
                  className="w-full"
                  labelClassName="text-[9px] sm:text-sm"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="employerArea"
                  label="Employer Area"
                  placeholder="Employer Area"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="employerPincode"
                  label="Employer Pincode"
                  placeholder="Employer Pincode"
                />
                <FormSelect
                  control={form.control}
                  name="employerState"
                  label="Employer State"
                  selectOptions={states.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] h-5 sm:text-sm p-2"
                  optionClassName="text-[9px] h-5 sm:text-sm p-2"
                  backToDefault={false}
                />
                <FormSelect
                  control={form.control}
                  name="employerCountry"
                  label="Employer Country"
                  selectOptions={countries.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] h-5 sm:text-sm p-2"
                  optionClassName="text-[9px] h-5 sm:text-sm p-2"
                  backToDefault={false}
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

export default EditEmployer;
