import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

import { Card, CardContent } from "~/shared/shadcn/ui/card";

const formSchema = z.object({
  docs: z.array(
    z.object({
      type: z.string(),
      description: z.string().optional(),
      file: z.string()
    })
  )
});
type FormType = z.infer<typeof formSchema>;

const UploadForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema)
  });
  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-2 gap-3"></div>
      </CardContent>
    </Card>
  );
};

export default UploadForm;
