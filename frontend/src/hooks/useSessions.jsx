import { useQuery } from "@tanstack/react-query";
import { getSessions } from "../lib/api";

export const SESSIONS = "sessions";
const useSessions = (opts = {}) => {
  const {
    data: sessions = [],
    isError,
    error,
    isPending,
    isLoading,
    isSuccess,
    status,
  } = useQuery({
    queryKey: [SESSIONS],
    queryFn: getSessions,
    ...opts,
  });

  return { sessions, isError, error, isPending, isLoading, isSuccess, status };
};

export default useSessions;
