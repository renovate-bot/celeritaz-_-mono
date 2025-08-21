"use client";

import React from "react";

import { api } from "~/trpc/react";

import LoadingPage from "~/shared/custom/loading-page";

import { useSession } from "~/lib/auth-client";

import EmployerCard from "./components/EmployerCard";
import IdentityCard from "./components/IdentityCard";
import KinCard from "./components/KinCard";
import OthersCard from "./components/OthersCard";
import PayerCard from "./components/PayerCard";
import PersonalCard from "./components/PersonalCard";
import ReferralCard from "./components/ReferralCard";

import type { inferRouterOutputs } from "@trpc/server";
import type { AppRouter } from "~/server/api/root";

export type PatientCompleteData =
  inferRouterOutputs<AppRouter>["patient"]["getPatientCompleteDetailsById"];

const Profile = () => {
  const { data: session } = useSession();
  const patientId = "pat_KgUaEk8DWXHeS0";

  const {
    data: patientData,
    isLoading,
    error
  } = api.patient.getPatientCompleteDetailsById.useQuery(
    {
      id: patientId ?? ""
    },
    {
      enabled: !!patientId
    }
  );

  if (isLoading) return <LoadingPage />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flex h-full w-full flex-col gap-2 p-2">
      <PersonalCard data={patientData} />
      <PayerCard data={patientData} />
      <KinCard data={patientData} />
      <EmployerCard data={patientData} />
      <ReferralCard data={patientData} />
      <IdentityCard data={patientData} />
      <OthersCard data={patientData} />
    </div>
  );
};

export default Profile;
