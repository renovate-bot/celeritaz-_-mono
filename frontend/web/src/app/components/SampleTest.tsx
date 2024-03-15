"use client";

import { useState } from "react";

import styles from "@frontend/src/app/page.module.css";
import { trpc } from "@frontend/src/app/trpc";

const SampleTest = () => {
  const [response, setResponse] = useState("");

  const makeApiCall = async () => {
    const res = await trpc.hello.query({ name: "world" });
    setResponse(res);
  };
  return (
    <div>
      <h1>{response}</h1>
      <button className={styles.button} onClick={makeApiCall}>
        Make api call
      </button>
    </div>
  );
};

export default SampleTest;
