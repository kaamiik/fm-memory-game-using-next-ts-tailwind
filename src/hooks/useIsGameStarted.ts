import { useSearchParams } from "next/navigation";

export default function useIsGameStarted() {
  const searchParams = useSearchParams();
  return (
    !!searchParams.get("theme") &&
    !!searchParams.get("playersNum") &&
    !!searchParams.get("grid")
  );
}
