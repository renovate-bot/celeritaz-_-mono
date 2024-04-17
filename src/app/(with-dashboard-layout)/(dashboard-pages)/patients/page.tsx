import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";

import SampleComponent from "~/app/(with-dashboard-layout)/components/sample-component";

const PatientsPage = () => {
  return (
    <PageContainer>
      <PageHeading title={"Patients"} subTitle={"Contains all the info about the patients"} />
      <SampleComponent />
    </PageContainer>
  );
};

export default PatientsPage;
