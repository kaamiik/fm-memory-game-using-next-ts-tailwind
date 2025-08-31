import * as React from 'react';

type FieldsetProps = {
  legend: string;
  children: React.ReactNode;
};

function Fieldset({ legend, children }: FieldsetProps) {
  return (
    <fieldset className="m-0 border-0 p-0">
      <legend className="text-350 sm:text-500 mb-3 sm:mb-4">{legend}</legend>
      <div className="flex items-center gap-2.5 sm:gap-8">{children}</div>
    </fieldset>
  );
}

export default Fieldset;
