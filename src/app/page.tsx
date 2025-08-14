"use client";

import { redirect } from "next/navigation";

import LoadingPage from "~/shared/custom/loading-page";

import { useSession } from "./lib/auth-client";

export default function Page() {
  const { data, isPending } = useSession();

  if (isPending) {
    return <LoadingPage />;
  } else if (data) {
    redirect("/dashboard");
  } else if (!data) {
    redirect("/auth/signin");
  }

  return <div>Home Page</div>;
}
