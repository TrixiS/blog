import { Loader2 } from "lucide-react";
import { PropsWithChildren } from "react";

export const Loading: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="flex flex-col items-center">
      <Loader2 className="h-20 w-20 animate-spin md:h-24 md:w-24" />
      {children}
    </div>
  );
};
