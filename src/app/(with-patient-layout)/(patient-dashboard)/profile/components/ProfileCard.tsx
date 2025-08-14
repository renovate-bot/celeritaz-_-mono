// import React from "react";
// import Image from "next/image";

// import { zodResolver } from "@hookform/resolvers/zod";
// import { Camera, ImageIcon } from "lucide-react";
// import { FormProvider, useForm } from "react-hook-form";
// import { z } from "zod";

// import { api } from "~/trpc/react";

// import FileUpload from "~/shared/custom/file-upload/FileUpload";
// import { Button } from "~/shared/shadcn/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogFooter,
//   DialogTrigger
// } from "~/shared/shadcn/ui/dialog";
// import { Form } from "~/shared/shadcn/ui/form";

// const ProfileCard = ({ patientId, imgUrl }: { patientId: string; imgUrl: string }) => {
//   const form = useForm<{ avatar: string }>({
//     resolver: zodResolver(
//       z.object({
//         avatar: z.string().optional()
//       })
//     )
//   });
//   const { toast } = useToast();

//   // const profileMutation = api.patient.updateProfilePhoto.useMutation({
//   //   onSuccess: () => {
//   //     toast({
//   //       title: "Profile photo updated successfully",
//   //       description: "Your profile photo has been updated successfully"
//   //     });
//   //   }
//   // });

//   const onSubmit = async (data: { avatar: string }) => {
//     await profileMutation.mutateAsync({
//       patientId,
//       avatar: data.avatar ?? ""
//     });
//   };

//   return (
//     <div className="flex h-full flex-col items-center justify-around gap-2 rounded-lg border p-4">
//       <div className="h-28 w-28 overflow-hidden rounded-full">
//         <Image
//           src={imgUrl ?? "/placeholder-user.jpg"}
//           alt="patient img"
//           width={112}
//           height={112}
//           className="object-cover"
//         />
//       </div>
//       <FormProvider {...form}>
//         <Form {...form}>
//           <form onSubmit={form.handleSubmit(onSubmit)}>
//             <Dialog>
//               <DialogTrigger>
//                 <div className="flex items-center gap-0.5 text-[10px] sm:text-sm">
//                   <p className="text-primary hover:underline">Change Avatar</p>
//                 </div>
//               </DialogTrigger>
//               <DialogContent className="w-[250px] sm:w-[300px]">
//                 <div className="flex w-full flex-row items-center justify-center gap-4">
//                   <Button
//                     disabled={!!form.watch("avatar")}
//                     variant={"outline"}
//                     className="h-15 w-15 flex flex-col gap-0.5">
//                     <Camera strokeWidth={1} className="h-9 w-9" />
//                     <p className="text-[8px] sm:text-sm">Camera</p>
//                   </Button>
//                   <FileUpload
//                     saveFileKeysIn="avatar"
//                     keypath={`patient/profile/${patientId}`}
//                     multiple={false}
//                     allowedTypes={["image/jpeg", "image/jpg", "image/png"]}
//                     maxFileSize={2 * 1024 * 1024}>
//                     <Button
//                       disabled={!!form.watch("avatar")}
//                       variant={"outline"}
//                       className="h-15 w-15 flex flex-col gap-0.5">
//                       <ImageIcon strokeWidth={1} className="h-9 w-9" />
//                       <p className="text-[8px] sm:text-sm">Gallery</p>
//                     </Button>
//                   </FileUpload>
//                 </div>
//                 <DialogFooter className="flex w-full flex-row items-center justify-center gap-2">
//                   <DialogClose asChild>
//                     <Button size={"xs"} variant="outline">
//                       Cancel
//                     </Button>
//                   </DialogClose>
//                   <Button
//                     size={"xs"}
//                     onClick={form.handleSubmit(onSubmit)}
//                     type="submit"
//                     className="px-4">
//                     Save
//                   </Button>
//                 </DialogFooter>
//               </DialogContent>
//             </Dialog>
//           </form>
//         </Form>
//       </FormProvider>
//     </div>
//   );
// };

// export default ProfileCard;

import React from "react";

const ProfileCard = () => {
  return <div>ProfileCard</div>;
};

export default ProfileCard;
