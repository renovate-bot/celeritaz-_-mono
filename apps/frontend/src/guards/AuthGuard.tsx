"use client";

import { type ReactElement } from "react";

import { useUser, withPageAuthRequired } from "@auth0/nextjs-auth0/client";

import LoadingPage from "~/shared/custom/loading-page";

const AuthGuard = ({ children }: { children: ReactElement }) => {
  const { isLoading } = useUser();

  if (isLoading) return <LoadingPage title={"Loading..."} description={"Checking the status of the auth."} />;

  return <>{children}</>;
};

export default withPageAuthRequired(AuthGuard, {
  onRedirecting: () => <LoadingPage title={"Loading..."} />,
  onError: (error) => {
    console.log(JSON.stringify(error, null, 2));
    return <LoadingPage title={"Loading..."} description={"Redirecting to login..."} />;
  }
});
