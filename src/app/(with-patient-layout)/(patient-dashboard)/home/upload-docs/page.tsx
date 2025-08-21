"use client";

import React from "react";
import { useRouter } from "next/navigation";

import { MoveLeft } from "lucide-react";

import { Button } from "~/shared/shadcn/ui/button";

const UploadDocs = () => {
  const router = useRouter();

  return (
    <div className="bg-background shadow-sm">
      <div className="grid grid-cols-3 items-center px-5 py-2">
        <MoveLeft className="size-5" onClick={() => router.push("/home")} />
        <h2 className="text-primary col-span-2 text-base font-bold">Upload Documents</h2>
      </div>
    </div>
  );
};

export default UploadDocs;
