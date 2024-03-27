import SampleComponent from "~/app/components/SampleComponent";

const HomePage = () => {
  return (
    <main className={"p-4"}>
      <p className={"text-2xl font-bold text-primary md:text-3xl"}>Dashboard</p>
      <SampleComponent />
    </main>
  );
};

export default HomePage;
