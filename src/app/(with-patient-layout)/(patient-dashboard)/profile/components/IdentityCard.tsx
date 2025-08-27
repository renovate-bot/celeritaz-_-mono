import React from "react";

import EditIdentity from "./edit/EditIdentity";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const IdentityCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Identity Information" edit={<EditIdentity data={data} />}>
      <div className="flex flex-col gap-2">
        {data?.identityWithUrl && data?.identityWithUrl.length > 0 ? (
          data?.identityWithUrl?.map((item, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <p className="text-primary text-xs font-semibold">{`Identity #${index + 1}`}</p>
              <LabelValue label="Identity Type" value={item.type} />
              <LabelValue label="Identity Document" value={item.fileUrl} />
            </div>
          ))
        ) : (
          <p className="text-primary flex w-full justify-center p-5 text-[11px] font-medium">
            No identity information found
          </p>
        )}
      </div>
    </ProfileCards>
  );
};

export default IdentityCard;
