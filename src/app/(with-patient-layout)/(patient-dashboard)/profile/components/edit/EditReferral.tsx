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
  id: z.string().optional(),
  patientId: z.string(),
  leadSource: z.string().optional(),
  leadSourceName: z.string().optional(),
  leadSourceComment: z.string().optional(),
  referralType: z.string().optional(),
  referralName: z.string().optional(),
  referralComment: z.string().optional()
});

const EditReferral = ({ data }: { data: PatientCompleteData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { control } = form;
  console.log(JSON.stringify(form.formState.errors, null, 2));

  const editMutation = api.patient.editReferralDetails.useMutation({
    onSuccess: () => {
      toast.success("Referral information updated successfully", {
        description: "Your referral information has been updated successfully"
      });
    },
    onError: () => {
      toast.error("Failed to update referral information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    form.reset({
      id: data?.referralDetailsData?.id ?? undefined,
      patientId: data?.demographicDetails?.patientId ?? "",
      leadSource: data?.referralDetailsData?.leadSource ?? undefined,
      leadSourceName: data?.referralDetailsData?.leadSourceName ?? undefined,
      leadSourceComment: data?.referralDetailsData?.leadSourceComment ?? undefined,
      referralType: data?.referralDetailsData?.referralType ?? undefined,
      referralName: data?.referralDetailsData?.referralName ?? undefined,
      referralComment: data?.referralDetailsData?.referralComment ?? undefined
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
                  name="leadSource"
                  label="Lead Source"
                  placeholder="Lead Source"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="leadSourceName"
                  label="Lead Source Name"
                  placeholder="Lead Source Name"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="leadSourceComment"
                  label="Lead Source Comment"
                  placeholder="Lead Source Comment"
                />
                <FormSelect
                  control={form.control}
                  name="referralType"
                  label="Referral Type"
                  selectOptions={["Self", "External Doctor", "Internal Doctor"].map((item) => ({
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
                  name="referralName"
                  label="Referral Name"
                  placeholder="Referral Name"
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="referralComment"
                  label="Referral Comment"
                  placeholder="Referral Comment"
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

export default EditReferral;
