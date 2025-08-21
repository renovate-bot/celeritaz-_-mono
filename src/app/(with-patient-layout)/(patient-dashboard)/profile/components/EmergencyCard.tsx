import React from "react";

import { formatName } from "~/lib/utils";

import EditEmergency from "./edit/EditEmergency";
import { LabelValue, ProfileCards } from "./utils";

import type { PatientCompleteData } from "../page";

const EmployerCard = ({ data }: { data: PatientCompleteData }) => {
  return (
    <ProfileCards title="Emergency Contact Information" edit={<EditEmergency data={data} />}>
      <div className="flex flex-col gap-4">
        {data?.emergencyDetailsData && data?.emergencyDetailsData.length > 0 ? (
          data?.emergencyDetailsData?.map((item, index) => (
            <div className="flex flex-col gap-2" key={index}>
              <p>{`Contact #${index + 1}`}</p>
              <LabelValue
                label="Full Name"
                value={formatName(item.firstName, item.middleName ?? null, item.lastName ?? null)}
              />
              <LabelValue label="Mobile Number" value={item.mobileNumber} />
              <LabelValue label="Email" value={item.email ?? ""} />
              <LabelValue label="Relation" value={item.relation} />
            </div>
          ))
        ) : (
          <p className="text-primary flex w-full justify-center p-5 text-[11px] font-medium">
            No emergency contact information
          </p>
        )}
      </div>
    </ProfileCards>
  );
};

export default EmployerCard;
