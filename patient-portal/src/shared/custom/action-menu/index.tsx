import { cn } from "~/lib/utils";

const ActionsMenu = ({
  children,
  onClick,
  className
}: {
  children: React.ReactElement | string;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <div
      className={cn(className, "hover:bg-secondary rounded-sm p-1 hover:cursor-pointer")}
      onClick={onClick}>
      {children}
    </div>
  );
};

export default ActionsMenu;
