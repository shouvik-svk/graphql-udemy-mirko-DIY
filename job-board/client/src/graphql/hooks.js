import { useMutation, useQuery } from "@apollo/client";
import { getAccessToken } from "../auth";
import { MUTATION_CREATE_JOB } from "./mutations";
import { QUERY_GET_ALL_JOBS, QUERY_GET_COMPANY_BY_ID, QUERY_GET_JOB_BY_ID } from "./queries";

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

export function useCompany(id) {
  const { data, loading, error } = useQuery(QUERY_GET_COMPANY_BY_ID, {
    variables: { companyId: id },
  });
  return {
    company: data?.company,
    loading,
    error: Boolean(error),
  };
}

export function useCreateJob() {
  const [mutate, { loading, error }] = useMutation(MUTATION_CREATE_JOB);
  return {
    createJob: async(title, description) => {
      const {
        data: { job },
     } = await mutate({
        variables: { createJobInput: { title, description } },
        context: {
           headers: { Authorization: `Bearer ${getAccessToken()}` },
        },
        update: (cache, { data: { job } }) => {
           cache.writeQuery({
              query: QUERY_GET_JOB_BY_ID,
              variables: { jobId: job.id },
              data: { job },
           });
        },
     });
     return job;
    },
    loading,
    error: Boolean(error)
  }
}