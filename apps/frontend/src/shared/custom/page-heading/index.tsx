import { memo } from "react";

const PageHeading = memo(({ title, subTitle }: { title: string; subTitle?: string }) => {
  return (
    <div>
      <h3 className="text-xl font-bold tracking-tight duration-150 lg:text-2xl">{title}</h3>
      {subTitle && <h5 className="text-sm text-muted-foreground duration-150 lg:text-base">{subTitle}</h5>}
    </div>
  );
});
PageHeading.displayName = "PageHeader";

export default PageHeading;
