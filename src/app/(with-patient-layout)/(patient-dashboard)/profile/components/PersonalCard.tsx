import React from "react";

import { formatAddress, formatName } from "~/lib/utils";

import EditPersonal from "./edit/EditPersonal";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const PersonalCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Personal Information" edit={<EditPersonal data={data} />}>
      <div className="flex flex-col gap-2">
        <LabelValue
          label="Name"
          value={formatName(
            data?.demographicDetails?.firstName ?? "",
            data?.demographicDetails?.middleName ?? null,
            data?.demographicDetails?.lastName ?? null
          )}
        />
        <LabelValue label="Date of Birth" value={data?.demographicDetails?.dob} type="date" />
        <LabelValue label="Gender" value={data?.demographicDetails?.gender} />
        <LabelValue label="Blood Group" value={data?.demographicDetails?.bloodGroup} />
        <LabelValue label="Mobile Number" value={data?.demographicDetails?.mobile} />
        <LabelValue
          label="Alternate Mobile Number"
          value={data?.demographicDetails?.alternateNumber}
        />
        <LabelValue label="Email Address" value={data?.demographicDetails?.email} />
        <LabelValue label="Father Name" value={data?.demographicDetails?.fatherName} />
        <LabelValue label="Mother Name" value={data?.demographicDetails?.motherName} />
        <LabelValue label="Spouse Name" value={data?.demographicDetails?.spouseName} />
        <LabelValue
          label="Address"
          value={formatAddress(
            data?.addressDetails?.addressLine1,
            data?.addressDetails?.addressLine2,
            data?.addressDetails?.city,
            data?.addressDetails?.state,
            data?.addressDetails?.country,
            data?.addressDetails?.pincode
          )}
        />
        <LabelValue
          label="Permanent Address"
          value={formatAddress(
            data?.permanentAddressDetails?.addressLine1,
            data?.permanentAddressDetails?.addressLine2,
            data?.permanentAddressDetails?.city,
            data?.permanentAddressDetails?.state,
            data?.permanentAddressDetails?.country,
            data?.permanentAddressDetails?.pincode
          )}
        />
        <LabelValue label="Nationality" value={data?.demographicDetails?.nationality} />
      </div>
    </ProfileCards>
  );
};

export default PersonalCard;
