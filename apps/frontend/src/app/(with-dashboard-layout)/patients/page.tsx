import SampleComponent from "~/app/components/SampleComponent";

const PatientsPage = () => {
  return (
    <main className={"p-4"}>
      <p className={"text-2xl font-bold text-primary md:text-3xl"}>Patients</p>
      <SampleComponent />
    </main>
  );
};

export default PatientsPage;
