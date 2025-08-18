import { HeartPulse } from "lucide-react";

import { cn } from "~/lib/utils";

const LoadingPage = ({
  title = "Loading",
  description,
  className
}: {
  title?: string;
  description?: string;
  className?: string;
}) => {
  return (
    <div className={cn("flex h-full sm:min-h-screen flex-col items-center justify-center", className)}>
      <div className={"flex items-center justify-center gap-2 lg:justify-start"}>
        <HeartPulse className="h-6 w-6 sm:h-8 sm:w-8 animate-pulse text-primary" />
        <h1 className="animate-pulse text-xl font-bold sm:text-4xl">
          Celeri<span className={"text-primary"}>Health</span>
        </h1>
      </div>
      {description && (
        <p className="text-md mt-4 font-medium text-primary opacity-40 2xl:text-lg">
          {description}
        </p>
      )}
    </div>
  );
};

export default LoadingPage;
