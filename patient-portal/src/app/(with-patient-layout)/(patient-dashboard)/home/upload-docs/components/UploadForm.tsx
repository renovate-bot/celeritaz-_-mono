import React, { useEffect } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import z from "zod";

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
import { Form } from "~/shared/shadcn/ui/form";
import FormInput from "~/shared/custom/form-fields/FormInput";

const formSchema = z.object({
  patientId: z.string(),
  docs: z.array(
    z.object({
      type: z.string(),
      description: z.string().optional(),
      file: z.string()
    })
  )
});

const UploadForm = () => {
  const patientId = "pat_KgUaEk8DWXHeS0"; //It shall be session.user.patientId

  const form = useForm({
    resolver: zodResolver(formSchema)
  });

  const { append, remove, fields } = useFieldArray({
    control: form.control,
    name: "docs"
  });

  useEffect(() => {
    form.reset({
      patientId: patientId,
      docs: [
        {
          type: "",
          description: undefined,
          file: ""
        }
      ]
    });
  }, [patientId, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-3 px-2">
          {fields.map((item, index) => (
            <Card key={item.id} className="rounded-md px-1 py-0 pb-0">
              <CardContent className="p-0">
                <Accordion type="single" collapsible className="w-full rounded-md px-1">
                  <AccordionItem value="item-1" className="border-0">
                    <AccordionTrigger className="flex gap-1 py-2">
                      <p className="text-primary flex-shirink-0 pb-1 text-xs font-medium">{`Item #${index + 1}`}</p>
                    </AccordionTrigger>
                    <AccordionContent className="pb-1">
                      <div className="flex w-full flex-col items-center justify-center gap-3 p-0">
                        <FormSelect
                          control={form.control}
                          name={`docs.${index}.type`}
                          label="Type"
                          selectOptions={[
                            "Aadhar",
                            "PAN",
                            "Voter ID",
                            "Passport",
                            "Driving License"
                          ]
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
                        <FormInput
                          control={form.control}
                          name={`docs.${index}.description`}
                          label="Description"
                          placeholder="Enter Description"
                          className="w-full gap-0.5"
                          labelClassName="text-[9px] sm:text-sm"
                          inputClassName="text-[9px] h-7 sm:h-auto sm:text-sm focus-visible:ring-ring/5 p-2"
                        />
                        <FileUpload
                          saveFileKeysIn={`docs.${index}.file`}
                          keypath={`patient/${form.getValues("patientId")}/previous-docs`}
                          formLabel="Document"
                          placeholder="Upload Document"
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
                                type: "",
                                description: undefined,
                                file: ""
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
      </form>
    </Form>
  );
};

export default UploadForm;
