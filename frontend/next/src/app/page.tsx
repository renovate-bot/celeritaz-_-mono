import SampleTest from "~/app/components/SampleTest";
import { trpc } from "~/app/trpc";

export default async function Page() {
  const response = await trpc.hello.query({
    name: "from server side"
  });

  return (
    <main>
      <div>
        <p>
          Server Side Rendering - Response: <span className={"font-bold"}>{response}</span>
        </p>
      </div>

      <SampleTest />
    </main>
  );
}
