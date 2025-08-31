'use client';
import { Loader } from 'react-feather';

export default function Loading() {
  return (
    <div className="bg-gray-lighter grid min-h-dvh place-items-center">
      <Loader
        aria-label="Loading"
        className="loading-spinner"
        size={52}
        color="hsl(37, 98%, 54%)"
        strokeWidth={2.5}
      />
      <span className="sr-only">Loading</span>
    </div>
  );
}
