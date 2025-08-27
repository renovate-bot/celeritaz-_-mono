import React, { useCallback, useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Pen } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { api } from "~/trpc/react";

import AlertDialog from "~/shared/custom/alert-dialog.tsx";
import FormInput from "~/shared/custom/form-fields/FormInput";
import FormSelect from "~/shared/custom/form-fields/FormSelect";
import { MultiSelect } from "~/shared/custom/multi-select/MultiSelect";
import {
  Dialog,
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
import { ScrollArea } from "~/shared/shadcn/ui/scroll-area";

import { DISABILITIES, OCCUPATION } from "~/lib/constants";

import type { PatientCompleteData } from "../../page";

const formSchema = z.object({
  patientId: z.string(),
  language: z.string().optional(),
  religion: z.string().optional(),
  occupation: z.string().optional(),
  disabilitiesType: z.array(z.string()).optional(),
  race: z.array(z.string()).optional(),
  identificationMarks: z.string().optional(),
  dietPreferences: z.string().optional(),
  familyIncome: z.string().optional(),
  frroNumber: z.string().optional()
});

const EditOthers = ({ data }: { data: PatientCompleteData }) => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  const { control } = form;
  const [mainDialog, setMainDialog] = useState(false);
  const utils = api.useUtils();
  const editMutation = api.patient.editOthersDetails.useMutation({
    onSuccess: async () => {
      toast.success("Other information updated successfully", {
        description: "Your other information has been updated successfully"
      });
      await utils.patient.getPatientCompleteDetailsById.invalidate();
      setMainDialog(false);
    },
    onError: () => {
      toast.error("Failed to update other information", {
        description: "Please try again"
      });
    }
  });

  useEffect(() => {
    form.reset({
      patientId: data?.demographicDetails?.patientId ?? "",
      language: data?.demographicDetails?.language ?? undefined,
      religion: data?.demographicDetails?.religion ?? undefined,
      occupation: data?.demographicDetails?.occupation ?? undefined,
      disabilitiesType: data?.demographicDetails?.disabilitiesType ?? undefined,
      race: data?.demographicDetails?.race ?? undefined,
      identificationMarks: data?.demographicDetails?.identificationMarks ?? undefined,
      dietPreferences: data?.demographicDetails?.dietPreferences ?? undefined,
      familyIncome: data?.demographicDetails?.familyIncome ?? undefined,
      frroNumber: data?.demographicDetails?.frroNumber ?? undefined
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
      <DialogContent className="w-[270px] p-2 pr-0.5 sm:max-w-[425px]">
        <Form {...form}>
          <form className="flex flex-col gap-4">
            <DialogTitle className="text-primary mt-3 items-start text-xs font-medium sm:text-sm">
              Edit Other Information
            </DialogTitle>
            <ScrollArea className="h-[300px] w-full">
              <div className="grid grid-cols-1 gap-3 pr-3">
                <FormSelect
                  control={form.control}
                  name="language"
                  label="Preferred Language"
                  selectOptions={[
                    "English",
                    "Hindi",
                    "Marathi",
                    "Kannada",
                    "Telugu",
                    "Tamil",
                    "Punjabi",
                    "Bengali"
                  ]
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
                <FormSelect
                  control={form.control}
                  name="religion"
                  label="Religion"
                  selectOptions={[
                    "Hindu",
                    "Muslim",
                    "Christian",
                    "Sikh",
                    "Jain",
                    "Buddhism",
                    "Other"
                  ]
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
                <FormSelect
                  control={form.control}
                  name="occupation"
                  label="Occupation"
                  selectOptions={OCCUPATION.sort().map((item) => ({
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
                <FormField
                  control={control}
                  name="disabilitiesType"
                  render={({ field }) => (
                    <FormItem className="gap-0.5">
                      <FormLabel className="text-[9px] sm:text-sm">Disabilities Type</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={DISABILITIES.map((item) => ({
                            label: item,
                            value: item
                          }))}
                          onValueChange={field.onChange}
                          placeholder="Select Disabilities"
                          variant="inverted"
                          size={"xs"}
                          maxCount={1}
                          contentClassName="text-[9px] sm:text-sm w-60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={control}
                  name="race"
                  render={({ field }) => (
                    <FormItem className="gap-0.5">
                      <FormLabel className="text-[9px] sm:text-sm">Race</FormLabel>
                      <FormControl>
                        <MultiSelect
                          options={[
                            "Asian",
                            "Black",
                            "Indian",
                            "White",
                            "Native American",
                            "Pacific Islander",
                            "Middle Eastern",
                            "Hispanic",
                            "Latino",
                            "Other"
                          ].map((item) => ({
                            label: item,
                            value: item
                          }))}
                          size="xs"
                          onValueChange={field.onChange}
                          placeholder="Select Race"
                          variant="inverted"
                          maxCount={1}
                          contentClassName="text-[9px] sm:text-sm w-60"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormInput
                  control={control}
                  className="gap-0.5 text-[9px] sm:text-sm"
                  labelClassName="text-[9px] sm:text-sm"
                  inputClassName="text-[9px] h-7 sm:text-sm focus-visible:ring-ring/5 p-2"
                  name="identificationMarks"
                  label="Identification Marks"
                  placeholder="Identification Marks"
                />
                <FormSelect
                  control={form.control}
                  name="dietPreferences"
                  label="Diet Preferences"
                  selectOptions={[
                    "Vegetarian",
                    "Eggetarian",
                    "Non Vegetarian",
                    "Vegan",
                    "Gluten Free",
                    "Kosher",
                    "Halal",
                    "Other"
                  ]
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
                <FormSelect
                  control={form.control}
                  name="familyIncome"
                  label="Family Income"
                  selectOptions={[
                    "Upto Rs. 1 Lac",
                    "Rs. 1 Lac to Rs. 5 Lacs",
                    "Rs. 5 Lacs to Rs. 10 Lacs",
                    "Rs. 10 Lacs to Rs. 25 Lacs",
                    "Rs. 25 Lacs to Rs. 50 Lacs",
                    "Rs. 50 Lacs to Rs. 1 Cr.",
                    "Above Rs. 1 Cr."
                  ]
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

export default EditOthers;
