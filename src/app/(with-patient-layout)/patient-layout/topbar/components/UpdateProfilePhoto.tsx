import React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, ImageIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { api } from "~/trpc/react";

import FileUpload from "~/shared/custom/file-upload/FileUpload";
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

const UpdateProfilePhoto = ({ patientId }: { patientId: string }) => {
  const form = useForm<{ avatar: string }>({
    resolver: zodResolver(
      z.object({
        avatar: z.string()
      })
    )
  });

  const profileMutation = api.patient.updateProfilePhoto.useMutation({
    onSuccess: () => {
      toast.success("Profile photo updated successfully", {
        description: "Your profile photo has been updated successfully"
      });
    }
  });

  const onSubmit = async (data: { avatar: string }) => {
    await profileMutation.mutateAsync({
      patientId,
      avatar: data.avatar ?? ""
    });
  };
  return (
    <Dialog modal={true}>
      <DialogTrigger onClick={(e) => e.stopPropagation()}>
        Select/Update Profile Picture
      </DialogTrigger>
      <DialogContent className="w-[250px] sm:w-[300px]">
        <DialogTitle className="text-[10px] sm:text-sm font-medium text-primary">Update Profile Picture</DialogTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
            <div className="flex w-full flex-row items-center justify-center gap-4 pt-2">
              <Button
                disabled={!!form.watch("avatar")}
                variant={"outline"}
                className="flex h-15 w-15 flex-col gap-0.5">
                <Camera strokeWidth={1} className="h-9 w-9" />
                <p className="text-[8px] sm:text-sm">Camera</p>
              </Button>
              <FileUpload
                saveFileKeysIn="avatar"
                keypath={`patient/${patientId}/profile`}
                multiple={false}
                allowedTypes={["image/jpeg", "image/jpg", "image/png"]}
                maxFileSize={10 * 1024 * 1024}>
                <Button
                  disabled={!!form.watch("avatar")}
                  variant={"outline"}
                  className="flex h-15 w-15 flex-col gap-0.5">
                  <ImageIcon strokeWidth={1} className="h-9 w-9" />
                  <p className="text-[8px] sm:text-sm">Gallery</p>
                </Button>
              </FileUpload>
            </div>
            <DialogFooter className="flex w-full flex-row items-center justify-center gap-2 pr-1">
              <DialogClose asChild>
                <Button size={"xs"} variant="outline">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                size={"xs"}
                onClick={form.handleSubmit(onSubmit)}
                type="submit"
                className="px-4">
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateProfilePhoto;
