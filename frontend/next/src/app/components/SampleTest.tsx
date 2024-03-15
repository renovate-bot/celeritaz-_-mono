"use client";

import { useState } from "react";

import { trpc } from "~/app/trpc";
import { Button } from "~/shared/shadcn/ui/button";

const SampleTest = () => {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState("");

  const makeApiCall = async () => {
    const res = await trpc.hello.query({ name: "Test" + count });
    setCount(count + 1);
    setResponse(res);
  };
  return (
    <div>
      <h1>
        Client Render: Response from the api <q>{response ? response : "Empty"}</q>
      </h1>
      <Button onClick={makeApiCall}>Make api call</Button>
    </div>
  );
};

export default SampleTest;
