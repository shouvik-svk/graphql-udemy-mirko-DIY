import { ApolloClient, InMemoryCache } from "@apollo/client";
import { getAccessToken } from '../auth';
import * as queries from "./queries";
import * as mutations from "./mutations";

const GRAPHQL_URL = 'http://localhost:9000/graphql';

const client = new ApolloClient({
  uri: GRAPHQL_URL,
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'cache-first'
    },
    mutate: {
      fetchPolicy: 'network-only'
    },
    watchQuery: {
      fetchPolicy: 'cache-first'
    }
  }
});

export async function getAllJobs() {
  const { data: { jobs }} = await client.query({
    query: queries.QUERY_GET_ALL_JOBS,
    fetchPolicy: 'cache-first'
  });
  return jobs;
}

export async function getJobById(id) {
  const variables = { jobId: id };
  const { data: { job }} = await client.query({
    query: queries.QUERY_GET_JOB_BY_ID,
    variables
  });
  return job;
}

export async function getCompanyById(id) {
  const variables = { companyId: id };
  const { data: { company }} = await client.query({
    query: queries.QUERY_GET_COMPANY_BY_ID,
    variables
  });
  return company;
}

export async function createJob(createJobInput) {
  const variables = { createJobInput: createJobInput };
  const context = {
    headers: { Authorization: `Bearer ${getAccessToken()}`}
  }
  const { data: { job }} = await client.mutate({
    mutation: mutations.MUTATION_CREATE_JOB,
    variables,
    context,
    update: (cache, { data: { job }}) => {
      cache.writeQuery({
        query: queries.QUERY_GET_JOB_BY_ID,
        variables: { id: job.id },
        data: { job }
      })
    }
  });

  return job;
}
