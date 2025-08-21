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

import { relations } from "~/lib/constants";

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  kinId: z.string().optional(),
  patientId: z.string(),
  name: z.string().optional(),
  relation: z.string().optional(),
  mobileNumber: z.string().optional(),
  gender: z.string().optional()
});

const EditKit = ({ data }: { data: PatientCompleteData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { control } = form;
  console.log(JSON.stringify(form.formState.errors, null, 2));
  const editMutation = api.patient.editKinDetails.useMutation({
    onSuccess: () => {
      toast.success("Kin information updated successfully", {
        description: "Your kin information has been updated successfully"
      });
    },
    onError: () => {
      toast.error("Failed to update kin information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    form.reset({
      kinId: data?.kinDetailsData?.id ?? undefined,
      patientId: data?.demographicDetails?.patientId ?? "",
      name: data?.kinDetailsData?.kinName ?? undefined,
      relation: data?.kinDetailsData?.relation ?? undefined,
      mobileNumber: data?.kinDetailsData?.mobileNumber ?? undefined,
      gender: data?.kinDetailsData?.gender ?? undefined
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
              Edit Kin Information
            </DialogTitle>
            <ScrollArea className="h-[300px] w-full">
              <div className="grid grid-cols-1 gap-3 pr-3">
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="name"
                  label="Kin Name"
                  placeholder="Kin Name"
                />
                <FormSelect
                  control={form.control}
                  name="gender"
                  label="Kin Gender"
                  selectOptions={[
                    { name: "Male", value: "male" },
                    { name: "Female", value: "female" }
                  ]}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  triggerSize="xs"
                  selectClassName="text-[9px] h-5 sm:text-sm p-2"
                  optionClassName="text-[9px] h-5 sm:text-sm p-2"
                  backToDefault={false}
                />
                <FormSelect
                  control={form.control}
                  name="relation"
                  label="Kin Relation"
                  selectOptions={relations.map((item) => ({
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
                <PhoneInputField
                  control={form.control}
                  name="mobileNumber"
                  label="Mobile Number"
                  placeholder="Kin Mobile Number"
                  className="w-full"
                  labelClassName="text-[9px] sm:text-sm"
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

export default EditKit;
