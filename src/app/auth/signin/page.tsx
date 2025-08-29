"use client";

import { Suspense } from "react";
import Link from "next/link";

import { HeartPulse } from "lucide-react";

import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import PatientSignInForm from "./components/sign-in-form";

function SignInFormSkeleton() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2 lg:justify-start">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-40 rounded" />
      </div>
      <div className="pt-4">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="mt-2 h-4 w-64 rounded" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
      </div>
      <div className="mt-4 text-center">
        <Skeleton className="mx-auto h-4 w-40 rounded" />
      </div>
    </div>
  );
}

export default function SignInPage() {
  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      <div className="bg-secondary/30 hidden duration-150 lg:flex lg:w-1/2 lg:flex-col lg:items-center lg:justify-center lg:gap-2 xl:w-2/3">
        <div className={"flex items-center gap-2"}>
          <HeartPulse className="text-primary h-8 w-8" />
          <h1 className="text-4xl font-bold">
            Celeri<span className={"text-primary"}>Health</span>
          </h1>
        </div>
        <h3 className={"text-muted-foreground text-lg"}>
          <blockquote>Streamline Your Healthcare Management</blockquote>
        </h3>
      </div>
      <div className="flex flex-1 items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-sm space-y-8">
          <div className={"flex items-center justify-center gap-2 lg:justify-start"}>
            <HeartPulse className="text-primary h-8 w-8" />
            <h1 className="text-3xl font-bold duration-150 sm:text-4xl">
              Celeri<span className={"text-primary"}>Health</span>
            </h1>
          </div>
          <div className={"pt-4 text-start"}>
            <h2 className="text-xl font-semibold sm:mt-6 sm:text-2xl">Welcome Back!</h2>
            <p className="text-muted-foreground text-sm sm:text-base">
              Please login to your celerihealth account.
            </p>
          </div>
          <Suspense fallback={<SignInFormSkeleton />}>
            <PatientSignInForm />
          </Suspense>
          <div className="mt-4 flex items-center justify-center gap-1 text-sm">
            Don&apos;t have an account?
            <Link href="/auth/signup" className="text-primary hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
