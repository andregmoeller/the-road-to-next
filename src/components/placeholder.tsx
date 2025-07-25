import { LucideMessageSquareWarning } from "lucide-react";
import { cloneElement } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<any>;
  button?: React.ReactElement<any>;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const Placeholder = ({ label, icon=<LucideMessageSquareWarning />, button=<div/> }: PlaceholderProps) => {
  return (
    <div className="flex-1 self-center flex flex-col items-center justify-center gap-y-2">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      <h2 className="text-lg text-center">{label}</h2>
      {cloneElement(button, {
        className: "h-10",
      })}
    </div>
  );
};

export { Placeholder };
