import React from "react";
import Link from "next/link";

import { Home } from "lucide-react";

import { Button } from "~/shared/shadcn/ui/button";

const Custom404: React.FC = () => {
  return (
    <div className="flex items-center justify-center bg-background">
      <div className="mt-56 text-center">
        <h1 className="text-9xl font-bold text-primary">404</h1>

        <h4 className="mt-4 text-3xl font-semibold text-primary">Oops!</h4>
        <p className="text-l mt-4 text-muted-foreground">
          The page you are looking for does not exist.
        </p>
        <Link href={"/profile"}>
          <Button className="mt-5">
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Custom404;
