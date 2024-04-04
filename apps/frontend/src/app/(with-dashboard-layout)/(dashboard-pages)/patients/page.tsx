import SampleComponent from "~/app/components/SampleComponent.tsx";
import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";

const PatientsPage = () => {
  return (
    <PageContainer>
      <PageHeading title={"Patients"} subTitle={"Contains all the info about the patients"} />
      <SampleComponent />
    </PageContainer>
  );
};

export default PatientsPage;
