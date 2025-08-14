import React from "react";
import Link from "next/link";

import { Home } from "lucide-react";

import { Button } from "~/shared/shadcn/ui/button";

const UnAuthorizedPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-background">
      <div className="mt-56 text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>

        <h4 className="mt-4 text-3xl font-semibold text-primary">Oops!</h4>
        <p className="text-l mt-4 text-muted-foreground">
          You do not have permissions to make this action
        </p>
        <Link href={"/dashboard"}>
          <Button className="mt-5">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default UnAuthorizedPage;
