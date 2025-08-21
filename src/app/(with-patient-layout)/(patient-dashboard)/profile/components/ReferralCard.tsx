import React from "react";

import EditPersonal from "./edit/EditPersonal";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const ReferralCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Referral Information" edit={<EditPersonal data={data} />}>
      <div className="flex flex-col gap-2">
        <LabelValue label="Lead Source" value={data?.referralDetailsData?.leadSource} />
        <LabelValue
          label="Lead Source Name"
          value={data?.referralDetailsData?.leadSourceName}
        />
        <LabelValue
          label="Lead Source Comment"
          value={data?.referralDetailsData?.leadSourceComment}
        />
        <LabelValue label="Referral Type" value={data?.referralDetailsData?.referralType} />
        <LabelValue label="Referral Name" value={data?.referralDetailsData?.referralName} />
        <LabelValue label="Referral Comment" value={data?.referralDetailsData?.referralComment} />
      </div>
    </ProfileCards>
  );
};

export default ReferralCard;
