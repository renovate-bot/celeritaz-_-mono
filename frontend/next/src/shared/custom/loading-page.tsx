const LoadingPage = ({ title = "Loading", description }: { title?: string; description?: string }) => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex flex-row items-center gap-4">
        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-primary border-solid" />
        <h2 className="text-4xl font-extrabold tracking-tight text-primary">{title}</h2>
      </div>
      {description && (
        <p className="text-md 2xl:text-lg text-primary font-medium mt-4 opacity-40">{description}</p>
      )}
    </div>
  );
};

export default LoadingPage;
