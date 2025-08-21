import React from "react";

import EditPayer from "./edit/EditPayer";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const PayerCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Payer Information" edit={<EditPayer data={data} />}>
      <div className="flex flex-col gap-2">
        <LabelValue label="Payer Name" value={data?.payerDetailsData?.name} />
        <LabelValue label="Payer Selection" value={data?.payerDetailsData?.selection} />
        <LabelValue label="Payer Type" value={data?.payerDetailsData?.type} />
        <LabelValue label="Payer Group" value={data?.payerDetailsData?.group} />
        <LabelValue label="Payer Sub Group" value={data?.payerDetailsData?.subGroup} />
        <LabelValue label="Insurance Company" value={data?.payerDetailsData?.insuranceCompany} />
        <LabelValue label="Policy Number" value={data?.payerDetailsData?.policyNumber} />
        <LabelValue label="Policy Limit" value={data?.payerDetailsData?.policyLimit} />
        <LabelValue label="Scheme" value={data?.payerDetailsData?.scheme} />
        <LabelValue
          label="Application From"
          value={data?.payerDetailsData?.applicationFromDate?.toISOString() ?? null}
          type="date"
        />
        <LabelValue
          label="Application To"
          value={data?.payerDetailsData?.applicationToDate?.toISOString() ?? null}
          type="date"
        />
        <LabelValue label="Required Name" value={data?.payerDetailsData?.requiredName} />
        <LabelValue label="Base Tarrif" value={data?.payerDetailsData?.baseTarrif} />
        <LabelValue label="Capping Percentage" value={data?.payerDetailsData?.cappingPercentage} />
        <LabelValue label="Claim Number" value={data?.payerDetailsData?.claimNumber} />
        <LabelValue label="TPA Admission Type" value={data?.payerDetailsData?.tpaAdmissionType} />
        <LabelValue
          label="Allow Non Payable Items"
          value={data?.payerDetailsData?.allowNonPayableItems ? "Yes" : "No"}
        />
        <LabelValue label="Is Co Pay" value={data?.payerDetailsData?.isCoPay ? "Yes" : "No"} />
      </div>
    </ProfileCards>
  );
};

export default PayerCard;
