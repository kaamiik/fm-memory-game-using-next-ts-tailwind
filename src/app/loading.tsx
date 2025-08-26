"use client";
import { Loader } from "react-feather";

export default function Loading() {
  return (
    <div className="min-h-dvh grid place-items-center bg-gray-lighter">
      <Loader
        aria-label="Loading"
        className="animate-spin"
        size={52}
        color="hsl(37, 98%, 54%)"
        strokeWidth={2.5}
      />
    </div>
  );
}
