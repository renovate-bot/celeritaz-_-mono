"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { MoveLeft } from "lucide-react";

import UploadForm from "./components/UploadForm";

const UploadDocs = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-background flex flex-row items-center gap-16 px-4 py-1 shadow-sm">
        <MoveLeft className="size-4" onClick={() => router.push("/home")} />
        <h2 className="text-primary col-span-2 text-sm font-bold">Upload Documents</h2>
      </div>
      <UploadForm />
    </div>
  );
};

export default UploadDocs;
