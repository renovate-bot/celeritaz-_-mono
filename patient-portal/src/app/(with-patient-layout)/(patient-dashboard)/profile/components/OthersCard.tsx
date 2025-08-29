import React from "react";

import EditOthers from "./edit/EditOthers";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const OthersCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Other Information" edit={<EditOthers data={data} />}>
      <div className="flex flex-col gap-2">
        <LabelValue label="Preferred Language" value={data?.demographicDetails?.language} />
        <LabelValue label="Religion" value={data?.demographicDetails?.religion} />
        <LabelValue label="Occupation" value={data?.demographicDetails?.occupation} />
        <LabelValue
          label="Disabilities Type"
          value={data?.demographicDetails?.disabilitiesType?.join(", ") ?? null}
        />
        <LabelValue label="Race" value={data?.demographicDetails?.race?.join(", ") ?? null} />
        <LabelValue
          label="Identification Marks"
          value={data?.demographicDetails?.identificationMarks}
        />
        <LabelValue label="Diet Preferences" value={data?.demographicDetails?.dietPreferences} />
        <LabelValue label="Family Income" value={data?.demographicDetails?.familyIncome} />
        <LabelValue label="FRRO Number" value={data?.demographicDetails?.frroNumber} />
      </div>
    </ProfileCards>
  );
};

export default OthersCard;
