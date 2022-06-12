import { useQuery } from "@apollo/client";
import { QUERY_GET_ALL_JOBS, QUERY_GET_JOB_BY_ID } from "./queries";

export function useJobs() {
  const { data, loading, error}  = useQuery(QUERY_GET_ALL_JOBS, {
    fetchPolicy: 'network-only'
  });

  return { jobs: data?.jobs, loading, error };
}

export function useJob(id) {
  const { data, loading, error } = useQuery(QUERY_GET_JOB_BY_ID, {
    variables: { jobId: id },
  });
  return {
    job: data?.job,
    loading,
    error: Boolean(error),
  };
}