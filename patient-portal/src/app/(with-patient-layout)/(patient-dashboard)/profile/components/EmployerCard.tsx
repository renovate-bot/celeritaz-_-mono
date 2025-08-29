import React from "react";

import { formatAddress } from "~/lib/utils";

import EditEmployer from "./edit/EditEmployer";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const EmployerCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Employer Information" edit={<EditEmployer data={data} />}>
      <div className="flex flex-col gap-2">
        <LabelValue label="Employee ID" value={data?.employerDetailsData?.employeeId} />
        <LabelValue
          label="Employee Mobile Number"
          value={data?.employerDetailsData?.employeeMobileNumber}
        />
        <LabelValue label="Employee Email" value={data?.employerDetailsData?.employeeEmail} />
        <LabelValue label="Employee Relation" value={data?.employerDetailsData?.relationship} />
        <LabelValue label="Employer Name" value={data?.employerDetailsData?.employerName} />
        <LabelValue
          label="Employer Mobile Number"
          value={data?.employerDetailsData?.employerMobileNumber}
        />
        <LabelValue label="Employer Email" value={data?.employerDetailsData?.employerEmail} />
        <LabelValue
          label="Employer Address"
          value={formatAddress(
            data?.employerDetailsData?.employerArea,
            data?.employerDetailsData?.employerCity,
            data?.employerDetailsData?.employerState,
            data?.employerDetailsData?.employerCountry,
            data?.employerDetailsData?.employerPincode
          )}
        />
      </div>
    </ProfileCards>
  );
};

export default EmployerCard;
