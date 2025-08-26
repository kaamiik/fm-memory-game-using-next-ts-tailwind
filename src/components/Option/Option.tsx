import * as React from "react";

type OptionProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  children?: React.ReactNode;
};

function Option({ label, children, id, value, ...delegated }: OptionProps) {
  return (
    <label className="bg-blue-light text-gray-lighter text-center p-2.5 w-full text-400 sm:text-650 rounded-full hover-transition hover:bg-blue-medium transition-colors duration-200 ease-in-out cursor-pointer has-[input:focus-visible]:bg-blue-medium has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-blue-500 has-[input:focus-visible]:outline-offset-1 has-[input:focus-visible]:outline-dotted has-[input:checked]:bg-blue-dark">
      <input
        type="radio"
        id={id}
        value={value || id}
        {...delegated}
        className="sr-only"
      />
      {children || label}
    </label>
  );
}

export default Option;
