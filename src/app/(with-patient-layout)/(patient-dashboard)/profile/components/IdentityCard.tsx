import React from "react";

import EditIdentity from "./edit/EditIdentity";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const IdentityCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Identity Information" edit={<EditIdentity data={data} />}>
      <div className="flex flex-col gap-2">
        <LabelValue label="Identity Type" value={data?.demographicDetails?.identityType} />
      </div>
    </ProfileCards>
  );
};

export default IdentityCard;
