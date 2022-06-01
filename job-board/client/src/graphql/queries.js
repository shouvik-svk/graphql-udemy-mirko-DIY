import { request, gql } from "graphql-request";

const GRAPHQL_URL = 'http://localhost:9000/graphql';

export async function getAllJobs() {
  const query = gql`
    query GetAllJobs {
      jobs {
        id,
        title,
        description
        company {
          name
        }
      }
    }
  `
  const { jobs } = await request(GRAPHQL_URL, query);
  return jobs;
}

export async function getJobById(id) {
  const query = gql`
    query GetJobById($jobId: ID!) {
      job(id: $jobId) {
        title
        description
        company {
          id
          name
        }
      }
    }
  `

  const variables = { jobId: id };
  const { job } = await request(GRAPHQL_URL, query, variables);
  return job;
}