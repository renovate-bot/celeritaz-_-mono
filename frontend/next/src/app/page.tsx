import SampleTest from "~/app/components/SampleTest";

export default async function Page() {
  return (
    <main>
      <div>
        <p>
          Server Side Rendering - Response: <span className={"font-bold"}>"Test response"</span>
        </p>
      </div>

      <SampleTest />
    </main>
  );
}
