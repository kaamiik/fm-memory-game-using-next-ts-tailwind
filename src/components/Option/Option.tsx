import * as React from 'react';

type OptionProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  children?: React.ReactNode;
};

function Option({ label, children, id, value, ...delegated }: OptionProps) {
  return (
    <label className="bg-blue-light text-gray-lighter text-400 sm:text-650 hover-transition hover:bg-blue-medium has-[input:focus-visible]:bg-blue-medium has-[input:checked]:bg-blue-dark w-full cursor-pointer rounded-full p-2.5 text-center transition-colors duration-200 ease-in-out has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-1 has-[input:focus-visible]:outline-blue-500 has-[input:focus-visible]:outline-dotted">
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
