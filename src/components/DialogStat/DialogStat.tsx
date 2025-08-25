import * as React from "react";

type DialogStatProps = {
  label: string;
  value: React.ReactNode;
  className?: string;
  isWinner?: boolean;
} & React.HTMLAttributes<HTMLDivElement>;

function DialogStat({
  label,
  value,
  className = "",
  isWinner = false,
  ...delegated
}: DialogStatProps) {
  return (
    <div
      className={`py-4 px-4 sm:px-8 flex justify-between items-center flex-wrap rounded-[5px] sm:rounded-[10px] ${
        isWinner ? "bg-blue-darker" : "bg-blue-lighter"
      } ${className}`}
      {...delegated}
    >
      <p className={isWinner ? "text-gray-lighter" : ""}>{label}</p>
      <p
        className={`text-500 sm:text-700 ${
          isWinner ? "text-gray-lighter" : "text-blue-dark"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

export default DialogStat;
