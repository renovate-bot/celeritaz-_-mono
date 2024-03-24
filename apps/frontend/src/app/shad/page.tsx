import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@repo/ui/alert";

const Shad = () => {
  return (
    <div className="p-10">
      <Alert>
        {/* <Terminal className="h-4 w-4" /> */}
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default Shad;
