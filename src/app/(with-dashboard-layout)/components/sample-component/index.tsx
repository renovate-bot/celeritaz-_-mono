"use client";

import { useState } from "react";
import Link from "next/link";

import { Button } from "~/shared/shadcn/ui/button";

const SampleComponent = () => {
  const [count, setCount] = useState(0);
  const [response, setResponse] = useState("");

  const makeApiCall = async () => {
    // const res = await api.post.hello({ text: `${count}` });
    setCount(count + 1);
    setResponse("hello");
  };
  return (
    <div className={"grid grid-rows-1 gap-2"}>
      <div>
        <h5 className={"text-xl"}>Current User Info</h5>
        {/*<div className={"flex flex-col gap-1 font-mono"}>*/}
        {/*  <p>Current User Logged In: {user?.name}</p>*/}
        {/*  <p>Current User Email: {user?.email}</p>*/}
        {/*  <p>Current User Id: {user?.sub}</p>*/}
        {/*  <p>Current Username: {user?.nickname}</p>*/}
        {/*  <div className={"flex items-center gap-2"}>*/}
        {/*    <p>Current User Picture: </p>*/}
        {/*    <Image src={user?.picture!} alt={user?.name!} width={40} height={40} />*/}
        {/*  </div>*/}
        {/*  <p>Current Email Verified: {user?.email_verified ? "true" : "false"}</p>*/}
        {/*  <p>Current Organization Id: {user?.org_id}</p>*/}
        {/*</div>*/}
      </div>
      <h1>
        Client Render: Response from the api <q>{response ? response : "Empty"}</q>
      </h1>
      <div className={"flex flex-wrap gap-2"}>
        <Button className={"w-fit"} onClick={makeApiCall}>
          Make api call
        </Button>

        <Link href={"/dashboard"} className={"w-fit"}>
          <Button>Dashboard</Button>
        </Link>
        <Link href={"/patients"} className={"w-fit"}>
          <Button>Patients</Button>
        </Link>
        <Link href={"/api/auth/logout"} className={"w-fit"}>
          <Button variant={"outline"}>Logout</Button>
        </Link>
      </div>
    </div>
  );
};

export default SampleComponent;
