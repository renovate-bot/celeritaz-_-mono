import React, { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { toast } from "sonner";
import z from "zod";

import { api } from "~/trpc/react";

import AlertDialog from "~/shared/custom/alert-dialog.tsx";
import FormInput from "~/shared/custom/form-fields/FormInput";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
import PhoneInputField from "~/shared/custom/form-fields/PhoneInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/shared/shadcn/ui/accordion";
import { Button } from "~/shared/shadcn/ui/button";
import { Card, CardContent } from "~/shared/shadcn/ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "~/shared/shadcn/ui/dialog";
import { Form } from "~/shared/shadcn/ui/form";
import { ScrollArea } from "~/shared/shadcn/ui/scroll-area";

import { FAMILY_RELATIONS } from "~/lib/constants";

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  patientId: z.string(),
  contacts: z.array(
    z.object({
      id: z.string().optional(),
      firstName: z.string(),
      middleName: z.string().optional(),
      lastName: z.string().optional(),
      mobileNumber: z.string().refine(isValidPhoneNumber, {
        message: "Invalid mobile number"
      }),
      email: z.string().optional(),
      relation: z.string()
    })
  ),
  deletedContacts: z.array(z.string())
});

const EditEmergency = ({ data }: { data: PatientCompleteData }) => {
  const [mainDialog, setMainDialog] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const utils = api.useUtils();

  const editMutation = api.patient.editEmergencyContactDetails.useMutation({
    onSuccess: async () => {
      toast.success("Emergency contact information updated successfully", {
        description: "Your emergency contact information has been updated successfully"
      });
      await utils.patient.getPatientCompleteDetailsById.invalidate();
      setMainDialog(false);
    },
    onError: () => {
      toast.error("Failed to update emergency contact information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    if (data?.emergencyDetailsData && data.emergencyDetailsData.length > 0) {
      form.reset({
        patientId: data.demographicDetails?.patientId ?? "",
        contacts: data.emergencyDetailsData.map((item) => ({
          id: item.id,
          firstName: item.firstName,
          middleName: item.middleName ?? undefined,
          lastName: item.lastName ?? undefined,
          mobileNumber: item.mobileNumber,
          relation: item.relation,
          email: item.email ?? undefined
        }))
      });
    } else {
      form.reset({
        patientId: data?.demographicDetails?.patientId ?? "",
        contacts: [
          {
            firstName: "",
            lastName: "",
            mobileNumber: "",
            relation: "",
            email: ""
          }
        ],
        deletedContacts: []
      });
    }
  }, [data, form]);

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
      <DialogContent className="w-[270px] p-2 pr-0.5 sm:max-w-[425px]">
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <DialogTitle className="text-primary mt-3 items-start text-xs font-medium sm:text-sm">
              Edit Emergency Information
            </DialogTitle>
            <ScrollArea className="h-[300px] w-full">
              <ContactItem />
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

export default EditEmergency;

export const ContactItem = () => {
  const { control, watch, setValue } = useFormContext();
  const fieldArray = useFieldArray({
    control: control,
    name: "contacts"
  });
  const { fields, append, remove } = fieldArray;
  return (
    <div className="grid gap-3 pr-1.5">
      {fields.map((item, index) => (
        <Card key={item.id} className="px-1 py-0 pb-0">
          <CardContent className="p-0">
            <Accordion type="single" collapsible className="w-full rounded-md px-1">
              <AccordionItem value="item-1" className="border-0">
                <AccordionTrigger className="flex gap-1 py-2">
                  <p className="text-primary flex-shirink-0 pb-1 text-xs font-medium">{`Contact #${index + 1}`}</p>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="flex w-full flex-col items-center justify-center gap-3 p-0">
                    <FormInput
                      control={control}
                      className="w-full gap-0.5 text-[9px] sm:text-sm"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                      name={`contacts.${index}.firstName`}
                      label="First Name"
                      placeholder="Enter First Name"
                      required
                    />
                    <FormInput
                      control={control}
                      className="w-full gap-0.5 text-[9px] sm:text-sm"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                      name={`contacts.${index}.middleName`}
                      label="Middle Name"
                      placeholder="Enter Middle Name"
                    />
                    <FormInput
                      control={control}
                      className="w-full gap-0.5 text-[9px] sm:text-sm"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                      name={`contacts.${index}.lastName`}
                      label="Last Name"
                      placeholder="Enter Last Name"
                    />
                    <PhoneInputField
                      control={control}
                      name={`contacts.${index}.mobileNumber`}
                      label="Mobile Number"
                      placeholder="Mobile Number"
                      className="w-full gap-0.5"
                      labelClassName="text-[9px] sm:text-sm"
                      required
                    />
                    <FormInput
                      control={control}
                      className="w-full gap-0.5 text-[9px] sm:text-sm"
                      labelClassName="text-[9px] sm:text-sm"
                      inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                      name={`contacts.${index}.email`}
                      label="Email Address"
                      placeholder="Enter Email Address"
                    />
                    <FormSelect
                      control={control}
                      name={`contacts.${index}.relation`}
                      label="Relation"
                      selectOptions={FAMILY_RELATIONS.map((item) => ({
                        name: item,
                        value: item
                      }))}
                      className="w-full gap-0.5 text-[9px] sm:text-sm"
                      labelClassName="text-[9px] sm:text-sm"
                      triggerSize="xs"
                      selectClassName="text-[9px] h-5 w-full sm:text-sm p-2"
                      optionClassName="text-[9px] h-5 sm:text-sm p-2"
                      backToDefault={false}
                      required
                    />
                    <div className="flex gap-10">
                      <Button
                        variant="link"
                        type="button"
                        className="text-primary h-5 p-0 text-[9px] font-medium"
                        onClick={() => {
                          if (watch(`contacts.${index}.id`)) {
                            setValue("deletedContacts", [
                              ...(watch("deletedContacts") as string[]),
                              watch(`contacts.${index}.id`) as string
                            ]);
                          }
                          remove(index);
                        }}
                        disabled={fields.length === 1}>
                        Remove Contact
                      </Button>
                      <Button
                        variant="link"
                        type="button"
                        className="text-primary h-5 p-0 text-[9px] font-medium"
                        disabled={fields.length !== index + 1}
                        onClick={() =>
                          append({
                            firstName: "",
                            lastName: "",
                            mobileNumber: "",
                            relation: "",
                            email: "",
                            gender: "",
                            middleName: ""
                          })
                        }>
                        + Add New Contact
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
