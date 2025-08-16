import React from "react";

export default function useTimer() {
  const [seconds, setSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);

  function formatTime() {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  React.useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  return {
    time: formatTime(),
    rawSeconds: seconds,
    start: React.useCallback(() => setIsRunning(true), []),
    stop: React.useCallback(() => {
      setIsRunning(false);
    }, []),
    reset: React.useCallback(() => {
      setSeconds(0);
      setIsRunning(false);
    }, []),
    isRunning,
  };
}
