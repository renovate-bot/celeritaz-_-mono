import SampleComponent from "~/app/(with-dashboard-layout)/components/sample-component";
import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";

const HomePage = () => {
  return (
    <PageContainer>
      <PageHeading
        title={"Dashboard"}
        subTitle={"Contains all the summary of all the components"}
      />
      <SampleComponent />
    </PageContainer>
  );
};

export default HomePage;
