"use client";

import React, { useState } from "react";

import { format } from "date-fns";
import { Pen } from "lucide-react";

import { api } from "~/trpc/react";

import LoadingPage from "~/shared/custom/loading-page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "~/shared/shadcn/ui/accordion";
import { Card, CardContent } from "~/shared/shadcn/ui/card";

import { useSession } from "~/lib/auth-client";
import { formatAddress, formatName } from "~/lib/utils";

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
      <ProfileCards title="Personal Information">
        <div className="flex flex-col gap-2">
          <LabelValue
            label="Name"
            value={formatName(
              patientData?.demographicDetails?.firstName ?? "",
              patientData?.demographicDetails?.middleName ?? null,
              patientData?.demographicDetails?.lastName ?? null
            )}
          />
          <LabelValue
            label="Date of Birth"
            value={patientData?.demographicDetails?.dob}
            type="date"
          />
          <LabelValue label="Gender" value={patientData?.demographicDetails?.gender} />
          <LabelValue label="Blood Group" value={patientData?.demographicDetails?.bloodGroup} />
          <LabelValue label="Mobile Number" value={patientData?.demographicDetails?.mobile} />
          <LabelValue
            label="Alternate Mobile Number"
            value={patientData?.demographicDetails?.alternateNumber}
          />
          <LabelValue label="Email Address" value={patientData?.demographicDetails?.email} />
          <LabelValue label="Father Name" value={patientData?.demographicDetails?.fatherName} />
          <LabelValue label="Mother Name" value={patientData?.demographicDetails?.motherName} />
          <LabelValue label="Spouse Name" value={patientData?.demographicDetails?.spouseName} />
          <LabelValue
            label="Address"
            value={formatAddress(
              patientData?.addressDetails?.addressLine1,
              patientData?.addressDetails?.addressLine2,
              patientData?.addressDetails?.city,
              patientData?.addressDetails?.state,
              patientData?.addressDetails?.country,
              patientData?.addressDetails?.pincode
            )}
          />
          <LabelValue
            label="Permanent Address"
            value={formatAddress(
              patientData?.permanentAddressDetails?.addressLine1,
              patientData?.permanentAddressDetails?.addressLine2,
              patientData?.permanentAddressDetails?.city,
              patientData?.permanentAddressDetails?.state,
              patientData?.permanentAddressDetails?.country,
              patientData?.permanentAddressDetails?.pincode
            )}
          />
          <LabelValue label="Nationality" value={patientData?.demographicDetails?.nationality} />
        </div>
      </ProfileCards>
      <ProfileCards title="Payer Information">
        <div className="flex flex-col gap-2">
          <LabelValue label="Payer Name" value={patientData?.payerDetailsData?.name} />
          <LabelValue label="Payer Selection" value={patientData?.payerDetailsData?.selection} />
          <LabelValue label="Payer Type" value={patientData?.payerDetailsData?.type} />
          <LabelValue label="Payer Group" value={patientData?.payerDetailsData?.group} />
          <LabelValue label="Payer Sub Group" value={patientData?.payerDetailsData?.subGroup} />
          <LabelValue
            label="Insurance Company"
            value={patientData?.payerDetailsData?.insuranceCompany}
          />
          <LabelValue label="Policy Number" value={patientData?.payerDetailsData?.policyNumber} />
          <LabelValue label="Policy Limit" value={patientData?.payerDetailsData?.policyLimit} />
          <LabelValue label="Scheme" value={patientData?.payerDetailsData?.scheme} />
          <LabelValue
            label="Application From"
            value={patientData?.payerDetailsData?.applicationFromDate?.toISOString() ?? null}
            type="date"
          />
          <LabelValue
            label="Application To"
            value={patientData?.payerDetailsData?.applicationToDate?.toISOString() ?? null}
            type="date"
          />
          <LabelValue label="Required Name" value={patientData?.payerDetailsData?.requiredName} />
          <LabelValue label="Base Tarrif" value={patientData?.payerDetailsData?.baseTarrif} />
          <LabelValue
            label="Capping Percentage"
            value={patientData?.payerDetailsData?.cappingPercentage}
          />
          <LabelValue label="Claim Number" value={patientData?.payerDetailsData?.claimNumber} />
          <LabelValue
            label="TPA Admission Type"
            value={patientData?.payerDetailsData?.tpaAdmissionType}
          />
          <LabelValue
            label="Allow Non Payable Items"
            value={patientData?.payerDetailsData?.allowNonPayableItems ? "Yes" : "No"}
          />
          <LabelValue
            label="Is Co Pay"
            value={patientData?.payerDetailsData?.isCoPay ? "Yes" : "No"}
          />
        </div>
      </ProfileCards>
      <ProfileCards title="Kin Information">
        <div className="flex flex-col gap-2">
          <LabelValue label="Kin Name" value={patientData?.kinDetailsData?.kinName} />
          <LabelValue label="Kin Relation" value={patientData?.kinDetailsData?.relation} />
          <LabelValue label="Kin Mobile Number" value={patientData?.kinDetailsData?.mobileNumber} />
          <LabelValue label="Kin Gender" value={patientData?.kinDetailsData?.gender} />
        </div>
      </ProfileCards>
      <ProfileCards title="Employer Information">
        <div className="flex flex-col gap-2">
          <LabelValue label="Employee ID" value={patientData?.employerDetailsData?.employeeId} />
          <LabelValue
            label="Employee Mobile Number"
            value={patientData?.employerDetailsData?.employeeMobileNumber}
          />
          <LabelValue
            label="Employee Email"
            value={patientData?.employerDetailsData?.employeeEmail}
          />
          <LabelValue
            label="Employee Relation"
            value={patientData?.employerDetailsData?.relationship}
          />
          <LabelValue
            label="Employer Name"
            value={patientData?.employerDetailsData?.employerName}
          />
          <LabelValue
            label="Employer Mobile Number"
            value={patientData?.employerDetailsData?.employerMobileNumber}
          />
          <LabelValue
            label="Employer Email"
            value={patientData?.employerDetailsData?.employerEmail}
          />
          <LabelValue
            label="Employer Address"
            value={formatAddress(
              patientData?.employerDetailsData?.employerArea,
              patientData?.employerDetailsData?.employerCity,
              patientData?.employerDetailsData?.employerState,
              patientData?.employerDetailsData?.employerCountry,
              patientData?.employerDetailsData?.employerPincode
            )}
          />
        </div>
      </ProfileCards>
      <ProfileCards title="Referral Information">
        <div className="flex flex-col gap-2">
          <LabelValue
            label="Referral Source"
            value={patientData?.referralDetailsData?.leadSource}
          />
          <LabelValue
            label="Referral Source Name"
            value={patientData?.referralDetailsData?.leadSourceName}
          />
          <LabelValue
            label="Referral Source Comment"
            value={patientData?.referralDetailsData?.leadSourceComment}
          />
          <LabelValue
            label="Referral Type"
            value={patientData?.referralDetailsData?.referralType}
          />
          <LabelValue
            label="Referral Name"
            value={patientData?.referralDetailsData?.referralName}
          />
          <LabelValue
            label="Referral Comment"
            value={patientData?.referralDetailsData?.referralComment}
          />
          <LabelValue
            label="Referred Inter Facility Name"
            value={patientData?.referralDetailsData?.referredInterFacilityName}
          />
        </div>
      </ProfileCards>
      <ProfileCards title="Identity Information">
        <div className="flex flex-col gap-2">
          <LabelValue label="Identity Type" value={patientData?.demographicDetails?.identityType} />
          <LabelValue
            label="Identity Number"
            value={patientData?.demographicDetails?.identityNumber}
          />
        </div>
      </ProfileCards>
      <ProfileCards title="Other Information">
        <div className="flex flex-col gap-2">
          <LabelValue label="Language" value={patientData?.demographicDetails?.language} />
          <LabelValue label="Religion" value={patientData?.demographicDetails?.religion} />
          <LabelValue label="Occupation" value={patientData?.demographicDetails?.occupation} />
          <LabelValue
            label="Disabilities Type"
            value={patientData?.demographicDetails?.disabilitiesType?.join(", ") ?? null}
          />
          <LabelValue
            label="Race"
            value={patientData?.demographicDetails?.race?.join(", ") ?? null}
          />
          <LabelValue
            label="Identification Marks"
            value={patientData?.demographicDetails?.identificationMarks}
          />
          <LabelValue
            label="Diet Preferences"
            value={patientData?.demographicDetails?.dietPreferences}
          />
          <LabelValue label="Family Income" value={patientData?.demographicDetails?.familyIncome} />
          <LabelValue label="FRRO Number" value={patientData?.demographicDetails?.frroNumber} />
        </div>
      </ProfileCards>
    </div>
  );
};

export default Profile;

const ProfileCards = ({ title, children }: { title: string; children: React.ReactNode }) => {
  return (
    <Card className="rounded-md px-1 py-0">
      <CardContent className="p-0">
        <Accordion type="single" collapsible className="w-full rounded-md px-1">
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="flex gap-1 py-2">
              <div className="flex w-full items-end-safe justify-between gap-1 overflow-hidden pr-1">
                <p className="flex-shrink-0 text-xs font-medium">{title}</p>
                <Pen size={10} className="text-muted-foreground cursor-pointer duration-200" />
              </div>
            </AccordionTrigger>
            <AccordionContent>{children}</AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};

const LabelValue = ({
  label,
  value,
  type = "text"
}: {
  label: string;
  value: string | null | undefined;
  type?: "date" | "text" | "number";
}) => {
  return (
    <div className="grid w-full grid-cols-2 items-center">
      <div className="text-muted-foreground flex w-4/5 items-center justify-between text-[10px] font-normal">
        <p>{label}</p>:
      </div>
      <p className="text-foreground text-[10px] capitalize">
        {type === "date" && value ? format(value, "dd MMM yyyy") : (value ?? "--")}
      </p>
    </div>
  );
};
