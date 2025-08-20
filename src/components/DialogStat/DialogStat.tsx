import * as React from "react";

type DialogStatProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

function DialogStat({
  label,
  value,
  className = "",
  ...delegated
}: DialogStatProps) {
  return (
    <div
      className={`bg-blue-lighter py-4 px-4 sm:px-8 flex justify-between items-center flex-wrap rounded-[5px] sm:rounded-[10px] ${className}`}
      {...delegated}
    >
      <p>{label}</p>
      <p className="text-blue-dark text-500 sm:text-700">{value}</p>
    </div>
  );
}

export default DialogStat;
