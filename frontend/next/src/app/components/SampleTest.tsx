"use client";

import { useState } from "react";

import { trpc } from "~/app/trpc";

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
      <button className={"px-4 py-2 bg-blue-600 rounded text-white"} onClick={makeApiCall}>
        Make api call
      </button>
    </div>
  );
};

export default SampleTest;
