import { useMutation } from "@tanstack/react-query";
import { deleteSession } from "../lib/api";

const useDeleteSession = (sessionId) => {
  const { mutate, isLoading, isPending, error } = useMutation({
    mutationFn: () => deleteSession(sessionId),
  });

  return { deleteSession: mutate, isLoading, isPending, error };
};

export { useDeleteSession };
