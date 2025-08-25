import React, { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useFieldArray, useForm, useFormContext } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { api } from "~/trpc/react";

import AlertDialog from "~/shared/custom/alert-dialog.tsx";
import FileUpload from "~/shared/custom/file-upload/FileUpload";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
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

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  patientId: z.string(),
  items: z.array(
    z.object({
      id: z.string().optional(),
      type: z.string(),
      url: z.string()
    })
  ),
  deletedItems: z.array(z.string()).optional()
});

const EditIdentity = ({ data }: { data: PatientCompleteData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const [mainDialog, setMainDialog] = useState(false);
  const utils = api.useUtils();
  const editMutation = api.patient.editIdentityDetails.useMutation({
    onSuccess: async () => {
      toast.success("Identity information updated successfully", {
        description: "Your identity information has been updated successfully"
      });
      await utils.patient.getPatientCompleteDetailsById.invalidate();
      setMainDialog(false);
    },
    onError: () => {
      toast.error("Failed to update identity information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    if (data?.identityWithUrl && data?.identityWithUrl?.length > 0) {
      form.reset({
        patientId: data?.demographicDetails?.patientId ?? "",
        items: data?.identityWithUrl.map((item) => ({
          id: item.id,
          type: item.type,
          url: item.fileUrl
        }))
      });
    } else {
      form.reset({
        patientId: data?.demographicDetails?.patientId ?? "",
        items: [
          {
            id: undefined,
            type: "",
            url: ""
          }
        ]
      });
    }
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
      <DialogContent className="w-[270px] p-2 pr-0.5 sm:max-w-[425px]">
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <DialogTitle className="text-primary mt-3 items-start text-xs font-medium sm:text-sm">
              Edit Identity Information
            </DialogTitle>
            <ScrollArea className="h-[300px] w-full">
              <IdentityItem />
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

export default EditIdentity;

export const IdentityItem = () => {
  const { control, watch, setValue, getValues } = useFormContext();
  const fieldArray = useFieldArray({
    control: control,
    name: "items"
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
                  <p className="text-primary flex-shirink-0 pb-1 text-xs font-medium">{`Item #${index + 1}`}</p>
                </AccordionTrigger>
                <AccordionContent className="pb-1">
                  <div className="flex w-full flex-col items-center justify-center gap-3 p-0">
                    <FormSelect
                      control={control}
                      name={`items.${index}.type`}
                      label="Identity Type"
                      selectOptions={["Aadhar", "PAN", "Voter ID", "Passport", "Driving License"]
                        .sort()
                        .map((item) => ({
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
                    <FileUpload
                      saveFileKeysIn={`items.${index}.url`}
                      keypath={`patient/${getValues("patientId")}/identity`}
                      formLabel="Identity Document"
                      placeholder="Upload Identity Document"
                      maxFileSize={10 * 1024 * 1024}
                      inputClassName="text-[9px] sm:text-sm focus-visible:ring-ring/5 flex justify-center items-center"
                      allowedTypes={["image/jpeg", "image/jpg", "image/png"]}
                      required
                    />
                    <div className="flex gap-10">
                      <Button
                        variant="link"
                        type="button"
                        className="text-primary h-5 p-0 text-[9px] font-medium"
                        onClick={() => {
                          if (watch(`items.${index}.id`)) {
                            setValue("deletedItems", [
                              ...(watch("deletedItems") as string[]),
                              watch(`items.${index}.id`) as string
                            ]);
                          }
                          remove(index);
                        }}
                        disabled={fields.length === 1}>
                        Remove Item
                      </Button>
                      <Button
                        variant="link"
                        type="button"
                        className="text-primary h-5 p-0 text-[9px] font-medium"
                        disabled={fields.length !== index + 1}
                        onClick={() =>
                          append({
                            id: undefined,
                            type: "",
                            url: ""
                          })
                        }>
                        + Add New Item
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
