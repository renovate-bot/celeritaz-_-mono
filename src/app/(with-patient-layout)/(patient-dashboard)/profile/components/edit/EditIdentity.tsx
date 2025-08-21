import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { api } from "~/trpc/react";

import FormInput from "~/shared/custom/form-fields/FormInput";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
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

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  patientId: z.string(),
  identityType: z.string().optional(),
  identityNumber: z.string().optional(),
  streetNumber: z.string().optional(),
  area: z.string().optional()
});

const EditIdentity = ({ data }: { data: PatientCompleteData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { control } = form;
  console.log(JSON.stringify(form.formState.errors, null, 2));

  const editMutation = api.patient.editIdentityDetails.useMutation({
    onSuccess: () => {
      toast.success("Identity information updated successfully", {
        description: "Your identity information has been updated successfully"
      });
    },
    onError: () => {
      toast.error("Failed to update identity information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    form.reset({
      patientId: data?.demographicDetails?.patientId ?? "",
      identityType: data?.demographicDetails?.identityType ?? undefined,
      identityNumber: data?.demographicDetails?.identityNumber ?? undefined,
      streetNumber: data?.demographicDetails?.streetNumber ?? undefined,
      area: data?.demographicDetails?.area ?? undefined
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
              Edit Identity Information
            </DialogTitle>
            <ScrollArea className="h-[300px] w-full">
              <div className="grid grid-cols-1 gap-3 pr-3">
                <FormSelect
                  control={form.control}
                  name="identityType"
                  label="Identity Type"
                  selectOptions={["Aadhar", "PAN", "Voter ID", "Passport", "Driving License"]
                    .sort()
                    .map((item) => ({
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
                  name="identityNumber"
                  label="Identity Number"
                  placeholder="Identity Number"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="streetNumber"
                  label="Street/Lane Number"
                  placeholder="Street/Lane Number"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="area"
                  label="Area/State/Country"
                  placeholder="Area/State/Country"
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

export default EditIdentity;
