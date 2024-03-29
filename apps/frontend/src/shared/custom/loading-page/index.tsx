import { cn } from "@ui/lib/utils";

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
    <div className={cn("flex min-h-screen flex-col items-center justify-center", className)}>
      <div className="flex flex-row items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-t-4 border-solid border-primary" />
        <h2 className="text-4xl font-extrabold tracking-tight text-primary">{title}</h2>
      </div>
      {description && (
        <p className="text-md mt-4 font-medium text-primary opacity-40 2xl:text-lg">{description}</p>
      )}
    </div>
  );
};

export default LoadingPage;
