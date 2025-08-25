"use client";

import { useEffect, useRef, useState } from "react";

import axios from "axios";
import { UploadIcon } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { api } from "~/trpc/react";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/shared/shadcn/ui/form";
import { Input } from "~/shared/shadcn/ui/input";

import { cn } from "~/lib/utils";
import { generateUniqueId } from "~/server/api/utils";

type FileObj = {
  fileName: string;
  fileKey: string;
};
// !! IMPORTANT!!
// Since the below component needs to be used within react-hook-form,
// It is mandatory to wrap the below component's form wrapper with FormProvider in the parent component
// so that we can access the form context in this component.

// Example:
//     <FormProvider {...form}>
//       <Form {...form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <FileUpload
//              saveFileKeysIn="fileKeys"
//              keypath="test"
//              multiple={true}
//              allowedTypes={["image/jpeg", "image/jpg", "image/png"]}
//              maxFileSize={2 * 1024 * 1024}
//              />
//           <Button type="submit">Submit</Button>
//         </form>
//       </Form>
//     </FormProvider>

export default function FileUpload({
  children,
  saveFileKeysIn, // The key where the file keys need to be saved in the form
  keypath, // The path where the file will be saved in the S3 bucket
  maxFileSize = 2 * 1024 * 1024, // 2MB in bytes
  allowedTypes = ["image/jpeg", "image/jpg", "image/png"], // Allowed file types
  saveUploadedFilesIn, // Contains the URLs of the files uploaded
  saveFileNamesIn, // Contains the names of the files uploaded
  multiple = false, // Whether to allow multiple files or not
  formLabel,
  placeholder = "Upload File",
  enableToastOnValidationError = false, // Whether to show toast on validation error or not
  type = "input", // Type of file upload display: input or icon
  required,
  inputClassName
}: {
  children?: React.ReactNode;
  saveFileKeysIn: string;
  keypath: string;
  maxFileSize: number;
  allowedTypes: string[];
  saveUploadedFilesIn?: string;
  saveFileNamesIn?: string;
  multiple?: boolean;
  formLabel?: string;
  placeholder?: string;
  enableToastOnValidationError?: boolean;
  type?: "input" | "icon";
  required?: boolean;
  inputClassName?: string;
}) {
  const [files, setFiles] = useState<FileList | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<FileObj[]>([]);

  const formContext = useFormContext();

  const getPresignedUrl = api.s3.getStandardUploadPresignedUrl.useMutation();

  useEffect(() => {
    const handleUploadImage = async ({
      uploadFile,
      fileKey
    }: {
      uploadFile: File;
      fileKey: string;
    }) => {
      try {
        const presignedUrl = await getPresignedUrl.mutateAsync(
          { key: fileKey },
          {
            onError: (error) => {
              console.error(`Error getting presigned URL for key ${fileKey}:`, error);
            }
          }
        );
        await axios.put(presignedUrl, uploadFile.slice(), {
          headers: { "Content-Type": uploadFile.type }
        });

        // Save the uploaded file URL in the form
        if (saveUploadedFilesIn) {
          const url = URL.createObjectURL(uploadFile);
          const existingUrls: string[] =
            (formContext.getValues(saveUploadedFilesIn) as string[]) ?? [];
          console.log("existing urls", existingUrls);
          formContext.setValue(saveUploadedFilesIn, [...existingUrls, url]);
        }
      } catch (error) {
        console.error(`Error uploading file with key ${fileKey}:`, error);
        toast.error("Error uploading file to Celeri Cloud", {
          description: `The file "${uploadFile.name}" could not be uploaded.`
        });
      }
    };

    const uploadFiles = async () => {
      if (!files || files.length === 0) return;
      if (multiple) {
        const fileKeys = await Promise.all(
          Array.from(files).map(async (file) => {
            const suggestedKey = `${keypath}/${generateUniqueId({ prefix: "celeri" })}.${file.name.split(".").pop()}`;
            await handleUploadImage({ uploadFile: file, fileKey: suggestedKey });
            setFileName((prev) => [...prev, { fileName: file.name, fileKey: suggestedKey }]);
            return suggestedKey;
          })
        );
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const existingFileKeys: string[] = formContext.getValues(saveFileKeysIn) ?? [];
        console.log("existing file keys", existingFileKeys, typeof existingFileKeys);
        console.log("file keys", fileKeys, typeof fileKeys);
        formContext.setValue(saveFileKeysIn, [...existingFileKeys, ...fileKeys]);
        if (saveFileNamesIn) {
          formContext.setValue(
            saveFileNamesIn,
            fileName.map((e) => e.fileName)
          );
        }
      } else {
        const file = files[0];
        if (!file) return;
        const suggestedKey = `${keypath}/${generateUniqueId({ prefix: "celeri" })}.${file.name.split(".").pop()}`;
        await handleUploadImage({ uploadFile: file, fileKey: suggestedKey });
        formContext.setValue(saveFileKeysIn, suggestedKey);
        if (saveFileNamesIn) {
          formContext.setValue(
            saveFileNamesIn,
            fileName.map((e) => e.fileName)
          );
        }
      }
    };

    uploadFiles().catch((error) => {
      console.error("Error uploading files:", error);
      toast.error("Error saving files keys in Celeri DB", {
        description: "An error occurred while saving files."
      });
    });
  }, [files]);

  const validateFiles = (files: FileList): boolean => {
    for (const file of files) {
      if (file.size > maxFileSize) {
        const fileSizeInMB = maxFileSize / (1024 * 1024);
        if (enableToastOnValidationError) {
          toast.error("Error uploading file", {
            description: `The file "${file.name}" exceeds the ${fileSizeInMB}MB limit.`
          });
        }
        formContext.setError(saveFileKeysIn, {
          message: `Exceeded ${fileSizeInMB}MB limit`
        });
        return false;
      }
      if (!allowedTypes.includes(file.type)) {
        if (enableToastOnValidationError) {
          toast.error("Error uploading file", {
            description: `The file "${file.name}" is not an allowed type.`
          });
        }
        formContext.setError(saveFileKeysIn, { message: "Invalid file type" });
        return false;
      }
    }

    formContext.clearErrors(saveFileKeysIn);
    return true;
  };

  return (
    <div>
      <FormField
        control={formContext.control}
        name={saveFileKeysIn}
        render={() => (
          <FormItem className="gap-0.5 sm:gap-1">
            {formLabel && (
              <FormLabel className="text-[9px] sm:text-sm">
                {formLabel}
                {required && <span className="ml-1 text-red-600">*</span>}
              </FormLabel>
            )}
            <FormControl>
              {children ? (
                <div onClick={() => fileInputRef.current?.click()}>
                  {children}
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    accept={allowedTypes.join(",")}
                    multiple={multiple}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        validateFiles(files);
                        setFiles(files);
                      }
                    }}
                  />
                </div>
              ) : type === "input" ? (
                <Input
                  type="file"
                  placeholder={placeholder}
                  accept={allowedTypes.join(",")}
                  multiple={multiple}
                  onChange={(e) => {
                    const files = e.target.files;
                    if (files) {
                      validateFiles(files);
                      setFiles(files);
                    }
                  }}
                  className={inputClassName}
                />
              ) : (
                <div onClick={() => fileInputRef.current?.click()}>
                  {<UploadIcon className="cursor-pointer" />}
                  <input
                    ref={fileInputRef}
                    type="file"
                    style={{ display: "none" }}
                    accept={allowedTypes.join(",")}
                    multiple={multiple}
                    onChange={(e) => {
                      const files = e.target.files;
                      if (files) {
                        validateFiles(files);
                        setFiles(files);
                      }
                    }}
                  />
                </div>
              )}
            </FormControl>
            <FormMessage>
              {JSON.stringify(formContext.formState.errors[saveFileKeysIn]?.message)}
            </FormMessage>
          </FormItem>
        )}
      />
    </div>
  );
}
