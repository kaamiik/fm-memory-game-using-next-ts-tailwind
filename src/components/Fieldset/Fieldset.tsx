import * as React from "react";

type FieldsetProps = {
  legend: string;
  children: React.ReactNode;
};

function Fieldset({ legend, children }: FieldsetProps) {
  return (
    <fieldset className="border-0 p-0 m-0">
      <legend className="mb-3 sm:mb-4 text-350 sm:text-500">{legend}</legend>
      <div className="flex gap-2.5 sm:gap-8 items-center">{children}</div>
    </fieldset>
  );
}

export default Fieldset;
