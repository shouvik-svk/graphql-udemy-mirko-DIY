import { useQuery } from "@apollo/client";
import { QUERY_GET_ALL_JOBS } from "./queries";

export function useJobs() {
  const { data, loading, error}  = useQuery(QUERY_GET_ALL_JOBS, {
    fetchPolicy: 'network-only'
  });

  return { jobs: data?.jobs, loading, error };
}