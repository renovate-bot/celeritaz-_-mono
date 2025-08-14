"use client";

import { Suspense } from "react";
import Link from "next/link";

import { HeartPulse } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/shared/shadcn/ui/card";
import { Skeleton } from "~/shared/shadcn/ui/skeleton";

import PatientSignUpForm from "./components/sign-up-form";

const SignUpFormSkeleton = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-center gap-2 lg:justify-start">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-40 rounded" />
      </div>
      <div className="pt-4">
        <Skeleton className="h-6 w-32 rounded" />
        <Skeleton className="mt-2 h-4 w-64 rounded" />
        <Skeleton className="h-12 w-full rounded" />
        <Skeleton className="h-12 w-full rounded" />
      </div>
    </div>
  );
};

export default function SignUp() {
  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <div className="flex items-center justify-center gap-2">
            <HeartPulse className="h-8 w-8 text-primary" />
            <h1 className="text-2xl font-bold sm:text-3xl">
              Celeri<span className="text-primary">Health</span>
            </h1>
          </div>
          <div className={"pt-8"}>
            <CardTitle className={"text-lg sm:text-xl"}>Registration</CardTitle>
            <CardDescription className="text-[11px] sm:text-sm">
              Welcome! Let&apos;s get you started on your healthcare journey.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<SignUpFormSkeleton />}>
            <PatientSignUpForm />
          </Suspense>
          <div className="mt-4 text-center text-xs sm:text-sm">
            Already have an account?{" "}
            <Link href="/auth/patient/signin" className="text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
