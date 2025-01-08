import { useQuery } from "@tanstack/react-query";
import { getUser } from "../lib/api";

export const AUTH = "auth";

const useAuth = (opts = {}) => {
  const {
    data: user,
    isError,
    error,
    isPending,
    isLoading,
    isSuccess,
    status,
  } = useQuery({
    queryKey: [AUTH],
    queryFn: getUser,
    staleTime: Infinity, //allow use to call useAuth anywhere in the app, As it will be stored in cache.
    ...opts,
  });
  return {
    user,
    isError,
    error,
    isPending,
    isLoading,
    isSuccess,
    status,
  };
};

export default useAuth;
