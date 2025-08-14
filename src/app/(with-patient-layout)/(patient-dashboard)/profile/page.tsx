"use client";

import React from "react";

import { api } from "~/trpc/react";

import LoadingPage from "~/shared/custom/loading-page";

import ProfileCard from "./components/ProfileCard";
import { useSession } from "~/lib/auth-client";

// import AppointmentsTable from "./components/AppointmentsTable";
// import ProfileCard from "./components/ProfileCard";
// import ProfileTabs from "./components/ProfileTabs";
// import RecentReportsTable from "./components/RecentReportsTable";

const Profile = () => {
  const { data: session } = useSession();
  const patientId = session?.user?.id;

  const patient = api.patient.getPatientById.useQuery(
    {
      id: patientId ?? "",
    },
    {
      enabled: !!patientId,
    },
  );

  if (patient.isLoading) return <LoadingPage />;
  if (patient.error) return <div>Error: {patient.error.message}</div>;

  return (
    <div className="grid h-1/3 w-full grid-cols-1 gap-5 p-4 md:grid-cols-5 md:p-8">
      <div>
        {/* <ProfileCard patientId={patientId ?? ""} imgUrl={patient.data?.imgUrl ?? ""} /> */}
        <ProfileCard />
      </div>
      <div className="md:col-span-2">{/* <RecentReportsTable /> */}</div>
      <div className="md:col-span-2">{/* <AppointmentsTable /> */}</div>
      <div className="md:col-span-5">{/* <ProfileTabs /> */}</div>
    </div>
  );
};

export default Profile;
