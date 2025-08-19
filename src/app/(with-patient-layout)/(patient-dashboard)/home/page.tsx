"use client";

import React, { useState } from "react";

import { Droplets, Pill, Stethoscope } from "lucide-react";

import { api } from "~/trpc/react";

import LoadingPage from "~/shared/custom/loading-page";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/shared/shadcn/ui/card";
import { Input } from "~/shared/shadcn/ui/input";

import { useSession } from "~/lib/auth-client";

// import AppointmentsTable from "./components/AppointmentsTable";
// import ProfileCard from "./components/ProfileCard";
// import ProfileTabs from "./components/ProfileTabs";
// import RecentReportsTable from "./components/RecentReportsTable";

const Home = () => {
  const { data: session } = useSession();
  const [query, setQuery] = useState("");

  const patientId = "pat_KgUaEk8DWXHeS0";

  const patient = api.patient.getPatientById.useQuery(
    {
      id: patientId ?? ""
    },
    {
      enabled: !!patientId
    }
  );

  if (patient.isLoading) return <LoadingPage />;
  if (patient.error) return <div>Error: {patient.error.message}</div>;

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-4">
      <Input
        type="text"
        placeholder="Search for doctors, labs, insurance, etc."
        className="h-8 w-full text-xs sm:text-sm"
        value={query}
        onChange={handleSearchInputChange}
      />
      <div className="grid w-full grid-cols-3 gap-2 md:grid-cols-5 md:p-8">
        <HomeOptions title="Doctor Booking" subTitle="Pre Book" icon={<Stethoscope size={18} />} />
        <HomeOptions title="Lab/Blood Test" subTitle="AT HOME" icon={<Droplets size={18} />} />
        <HomeOptions title="Pharmacy" subTitle="18% OFF" icon={<Pill size={18} />} />
        <HomeOptions title="Pharmacy" subTitle="18% OFF" icon={<Pill size={18} />} />
        <HomeOptions title="Pharmacy" subTitle="18% OFF" icon={<Pill size={18} />} />
        <HomeOptions title="Pharmacy" subTitle="18% OFF" icon={<Pill size={18} />} />
      </div>
    </div>
  );
};

export default Home;

const HomeOptions = ({
  title,
  subTitle,
  icon
}: {
  title: string;
  subTitle: string;
  icon?: React.ReactNode;
}) => {
  return (
    <Card className="rounded-md pt-1 pb-2 gap-8 justify-between">
      <CardHeader className="gap-0.5 px-1 py-0">
        <CardTitle className="py-0 text-xs">
          <h1>{title}</h1>
        </CardTitle>
        <CardDescription className="pt-0 text-[10px] text-primary font-semibold uppercase">
          {subTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-end px-2">{icon}</CardContent>
    </Card>
  );
};
