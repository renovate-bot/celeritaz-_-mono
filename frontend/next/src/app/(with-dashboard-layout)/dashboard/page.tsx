import SampleComponent from "~/app/components/SampleComponent";

const HomePage = () => {
  return (
    <main className={"p-4"}>
      <p className={"text-primary text-3xl font-bold"}>Dashboard</p>
      <SampleComponent />
    </main>
  );
};

export default HomePage;
