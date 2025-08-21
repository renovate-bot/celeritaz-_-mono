import React, { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import z from "zod";

import { api } from "~/trpc/react";

import AlertDialog from "~/shared/custom/alert-dialog.tsx";
import FormCheckBox from "~/shared/custom/form-fields/FormCheckBox";
import FormDatePicker from "~/shared/custom/form-fields/FormDatePicker";
import FormInput from "~/shared/custom/form-fields/FormInput";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
import PhoneInputField from "~/shared/custom/form-fields/PhoneInput";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "~/shared/shadcn/ui/dialog";
import { Form } from "~/shared/shadcn/ui/form";
import { ScrollArea } from "~/shared/shadcn/ui/scroll-area";

import { countries, nationalities, states } from "~/lib/constants";

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  patientId: z.string(),
  currentAddressId: z.string(),
  permanentAddressId: z.string().nullable(),
  firstName: z.string(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
  dob: z.coerce.date({
    required_error: "Date of birth is required"
  }),
  gender: z.string({ required_error: "Required" }),
  bloodGroup: z.enum(["O+", "B+", "A+", "AB+", "O-", "A-", "B-", "AB-", ""]).optional(),
  mobile: z.string().refine(isValidPhoneNumber, { message: "Invalid phone number" }),
  alternateNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Enter valid phone number" })
    .or(z.literal(""))
    .optional(),
  nationality: z.string({ required_error: "Required" }),
  email: z.string().email({ message: "Enter valid email address" }).optional(),
  motherName: z.string().optional(),
  fatherName: z.string().optional(),
  spouseName: z.string().optional(),
  currentAddress: z.object({
    addressLine1: z.string(),
    addressLine2: z.string().optional(),
    city: z.string().regex(/^[a-zA-Z-. ]*$/, {
      message: "Special Characters are not allowed"
    }),
    state: z.string(),
    country: z.string(),
    pincode: z.string()
  }),
  permanentAddress: z
    .object({
      addressLine1: z.string(),
      addressLine2: z.string().optional(),
      city: z.string().regex(/^[a-zA-Z-. ]*$/, {
        message: "Special Characters are not allowed"
      }),
      state: z.string(),
      country: z.string(),
      pincode: z.string()
    })
    .optional(),
  samePermenantAddress: z.boolean().default(false)
});

const EditPersonal = ({ data }: { data: PatientCompleteData }) => {
  const [mainDialog, setMainDialog] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const isPermanent = form.watch("samePermenantAddress");

  const editMutation = api.patient.editPersonalDetails.useMutation({
    onSuccess: async () => {
      toast.success("Personal information updated successfully", {
        description: "Your personal information has been updated successfully"
      });
      await api.useUtils().patient.getPatientCompleteDetailsById.invalidate();
    },
    onError: () => {
      toast.error("Failed to update personal information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    form.reset({
      patientId: data?.demographicDetails?.patientId ?? "",
      currentAddressId: data?.demographicDetails?.addressId ?? "",
      permanentAddressId: data?.demographicDetails?.permanentAddressId ?? null,
      firstName: data?.demographicDetails?.firstName,
      middleName: data?.demographicDetails?.middleName ?? undefined,
      lastName: data?.demographicDetails?.lastName ?? undefined,
      dob: data?.demographicDetails?.dob ? new Date(data?.demographicDetails?.dob) : undefined,
      gender: data?.demographicDetails?.gender,
      bloodGroup: data?.demographicDetails?.bloodGroup ?? undefined,
      mobile: data?.demographicDetails?.mobile,
      alternateNumber: data?.demographicDetails?.alternateNumber ?? undefined,
      email: data?.demographicDetails?.email ?? undefined,
      fatherName: data?.demographicDetails?.fatherName ?? undefined,
      motherName: data?.demographicDetails?.motherName ?? undefined,
      spouseName: data?.demographicDetails?.spouseName ?? undefined,
      nationality: data?.demographicDetails?.nationality ?? undefined,
      currentAddress: {
        addressLine1: data?.addressDetails?.addressLine1 ?? "",
        addressLine2: data?.addressDetails?.addressLine2 ?? undefined,
        city: data?.addressDetails?.city ?? "",
        state: data?.addressDetails?.state ?? "",
        country: data?.addressDetails?.country ?? "",
        pincode: data?.addressDetails?.pincode ?? ""
      },
      permanentAddress: {
        addressLine1: data?.permanentAddressDetails?.addressLine1 ?? "",
        addressLine2: data?.permanentAddressDetails?.addressLine2 ?? undefined,
        city: data?.permanentAddressDetails?.city ?? "",
        state: data?.permanentAddressDetails?.state ?? "",
        country: data?.permanentAddressDetails?.country ?? "",
        pincode: data?.permanentAddressDetails?.pincode ?? ""
      },
      samePermenantAddress: data?.demographicDetails?.samePermanentAddress ?? false
    });
  }, [form, data]);

  const formSubmission = useCallback(async () => {
    await form.handleSubmit(async (data: z.infer<typeof formSchema>) => {
      await editMutation.mutateAsync(data);
    })();
  }, [form, editMutation]);

  return (
    <Dialog open={mainDialog} onOpenChange={setMainDialog}>
      <DialogTrigger asChild>
        <Pen size={10} className="text-muted-foreground cursor-pointer duration-200" />
      </DialogTrigger>
      <DialogContent className="w-[270px] p-2 pr-0.5 sm:w-full">
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <DialogTitle className="text-primary mt-3 items-start text-xs font-medium sm:text-sm">
              Edit Personal Information
            </DialogTitle>
            <ScrollArea className="h-[300px] w-full">
              <div className="grid grid-cols-1 gap-3 pr-3">
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="firstName"
                  label="First Name"
                  placeholder="First Name"
                  required
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="middleName"
                  label="Middle Name"
                  placeholder="Middle Name"
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="lastName"
                  label="Last Name"
                  placeholder="Last Name"
                />
                <FormDatePicker
                  control={form.control}
                  labelClassName="text-[9px] sm:text-sm"
                  className="h-7 px-2 text-[9px] sm:h-auto sm:text-sm"
                  label="Date of Birth"
                  name="dob"
                  required
                />
                <FormSelect
                  control={form.control}
                  name="gender"
                  label="Gender"
                  selectOptions={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                  ]}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] sm:text-sm p-2"
                  optionClassName="text-[9px] sm:text-sm p-2"
                  backToDefault={false}
                  required
                />
                <FormSelect
                  control={form.control}
                  name="bloodGroup"
                  label="Blood Group"
                  selectOptions={[
                    { name: "O+", value: "O+" },
                    { name: "B+", value: "B+" },
                    { name: "A+", value: "A+" },
                    { name: "AB+", value: "AB+" },
                    { name: "O-", value: "O-" },
                    { name: "A-", value: "A-" },
                    { name: "B-", value: "B-" },
                    { name: "AB-", value: "AB-" }
                  ]}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] sm:text-sm p-2"
                  optionClassName="text-[9px] sm:text-sm p-2"
                  backToDefault={false}
                />
                <PhoneInputField
                  control={form.control}
                  name="mobile"
                  label="Mobile Number"
                  placeholder="Mobile Number"
                  className="w-full"
                  labelClassName="text-[9px] sm:text-sm"
                  required
                />
                <PhoneInputField
                  control={form.control}
                  name="alternateNumber"
                  label="Alternate Number"
                  placeholder="Alternate Number"
                  phoneInputClassName="text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="email"
                  label="Email Address"
                  placeholder="Email Address"
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="fatherName"
                  label="Father Name"
                  placeholder="Father Name"
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="motherName"
                  label="Mother Name"
                  placeholder="Mother Name"
                />
                <FormInput
                  control={form.control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="spouseName"
                  label="Spouse Name"
                  placeholder="Spouse Name"
                />
                <FormSelect
                  control={form.control}
                  name="nationality"
                  label="Nationality"
                  selectOptions={nationalities.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] sm:text-sm p-2"
                  optionClassName="text-[9px] sm:text-sm p-2"
                  backToDefault={false}
                  required
                />
                <p className="text-xs font-semibold sm:text-sm">Current Address</p>
                <FormInput
                  control={form.control}
                  name="currentAddress.addressLine1"
                  label="Address Line 1"
                  placeholder="Address Line 1"
                  className="gap-0.5"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  required
                />
                <FormInput
                  control={form.control}
                  name="currentAddress.addressLine2"
                  label="Address Line 2"
                  placeholder="Address Line 2"
                  className="gap-0.5"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  required
                />
                <FormInput
                  control={form.control}
                  name="currentAddress.city"
                  label="City"
                  placeholder="City"
                  className="gap-0.5"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  required
                />
                <FormSelect
                  control={form.control}
                  name="currentAddress.state"
                  label="State"
                  selectOptions={states.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] sm:text-sm p-2"
                  optionClassName="text-[9px] sm:text-sm p-2"
                  backToDefault={false}
                />
                <FormSelect
                  control={form.control}
                  name="currentAddress.country"
                  label="Country"
                  selectOptions={countries.map((item) => ({
                    name: item,
                    value: item
                  }))}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] sm:text-sm p-2"
                  optionClassName="text-[9px] sm:text-sm p-2"
                  backToDefault={false}
                />
                <FormInput
                  control={form.control}
                  name="currentAddress.pincode"
                  label="Pincode"
                  placeholder="Pincode"
                  type="number"
                  className="gap-0.5"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                  required
                />
                <FormCheckBox
                  control={form.control}
                  name="samePermenantAddress"
                  label="Same as Current Address"
                  labelClassName="text-[9px] sm:text-sm"
                  className="gap-0.5"
                  checkboxClassName="size-3"
                />
                {!isPermanent && (
                  <>
                    <p className="text-xs font-semibold sm:text-sm">Permanent Address</p>
                    <FormInput
                      control={form.control}
                      name="permanentAddress.addressLine1"
                      label="Address Line 1"
                      placeholder="Address Line 1"
                      className="gap-0.5"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                    />
                    <FormInput
                      control={form.control}
                      name="permanentAddress.addressLine2"
                      label="Address Line 2"
                      placeholder="Address Line 2"
                      className="gap-0.5"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                    />
                    <FormSelect
                      control={form.control}
                      name="currentAddress.state"
                      label="State"
                      selectOptions={states.map((item) => ({
                        name: item,
                        value: item
                      }))}
                      className="gap-0.5 text-[9px] sm:text-sm"
                      labelClassName="text-[9px] sm:text-sm"
                      triggerSize="xs"
                      selectClassName="text-[9px] sm:text-sm p-2"
                      optionClassName="text-[9px] sm:text-sm p-2"
                      backToDefault={false}
                    />
                    <FormSelect
                      control={form.control}
                      name="currentAddress.country"
                      label="Country"
                      selectOptions={countries.map((item) => ({
                        name: item,
                        value: item
                      }))}
                      className="gap-0.5 text-[9px] sm:text-sm"
                      labelClassName="text-[9px] sm:text-sm"
                      triggerSize="xs"
                      selectClassName="text-[9px] sm:text-sm p-2"
                      optionClassName="text-[9px] sm:text-sm p-2"
                      backToDefault={false}
                    />
                    <FormInput
                      control={form.control}
                      name="permanentAddress.city"
                      label="City"
                      placeholder="City"
                      className="gap-0.5"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                    />
                    <FormInput
                      control={form.control}
                      name="permanentAddress.pincode"
                      label="Pincode"
                      placeholder="Pincode"
                      type="number"
                      className="gap-0.5"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                    />
                  </>
                )}
              </div>
            </ScrollArea>
            <DialogFooter className="flex w-full flex-row items-center justify-center gap-2 pr-1">
              <AlertDialog
                onConfirm={async () => {
                  setMainDialog(false);
                  form.reset();
                }}
                buttonName="Cancel"
                buttonVariant="outline"
                description="Are you sure you want to discard the changes?"
                buttonType="reset"
                triggerClassName="h-7 sm:h-8 rounded-md px-3 text-[10px] sm:text-sm"
                submitButtonClassName="h-7 sm:h-8 rounded-md px-5 text-[10px] sm:text-sm"
                cancelButtonClassName="h-7 sm:h-8 rounded-md px-5 text-[10px] sm:text-sm"
              />
              <AlertDialog
                onConfirm={async () => await formSubmission()}
                buttonName="Update"
                buttonVariant="default"
                description="Are you sure you want to update the changes?"
                buttonType="submit"
                triggerClassName="h-7 sm:h-8 rounded-md px-3 text-[10px] sm:text-sm"
                submitButtonClassName="h-7 sm:h-8 rounded-md px-5 text-[10px] sm:text-sm"
                cancelButtonClassName="h-7 sm:h-8 rounded-md px-5 text-[10px] sm:text-sm"
                isLoading={editMutation.isPending}
              />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditPersonal;
