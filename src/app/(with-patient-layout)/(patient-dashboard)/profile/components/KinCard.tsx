import React from "react";

import EditKin from "./edit/EditKin";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const KinCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Kin Information" edit={<EditKin data={data} />}>
      <div className="flex flex-col gap-2">
        <LabelValue label="Kin Name" value={data?.kinDetailsData?.kinName} />
        <LabelValue label="Kin Relation" value={data?.kinDetailsData?.relation} />
        <LabelValue label="Kin Mobile Number" value={data?.kinDetailsData?.mobileNumber} />
        <LabelValue label="Kin Gender" value={data?.kinDetailsData?.gender} />
      </div>
    </ProfileCards>
  );
};

export default KinCard;
