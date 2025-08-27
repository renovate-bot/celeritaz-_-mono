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
        <LabelValue label="Insurance Company" value={data?.payerDetailsData?.insuranceCompany} />
        <LabelValue label="Policy Number" value={data?.payerDetailsData?.policyNumber} />
      </div>
    </ProfileCards>
  );
};

export default PayerCard;
