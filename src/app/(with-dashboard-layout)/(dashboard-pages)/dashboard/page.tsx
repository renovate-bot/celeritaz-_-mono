import PageContainer from "~/shared/custom/page-container";
import PageHeading from "~/shared/custom/page-heading";
import { Button } from "~/shared/shadcn/ui/button";

import SampleComponent from "~/app/(with-dashboard-layout)/components/sample-component";

const HomePage = () => {
  return (
    <PageContainer>
      <PageHeading
        title={"Dashboard"}
        subTitle={"Contains all the summary of all the components"}
      />
      <SampleComponent />
      <Button variant="destructive">Primary</Button>
    </PageContainer>
  );
};

export default HomePage;
