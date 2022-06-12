import { gql } from "@apollo/client";

export const QUERY_GET_ALL_JOBS = gql`
   query GetAllJobs {
      jobs {
         id
         title
         company {
            id
            name
         }
      }
   }
`;

export const QUERY_GET_JOB_BY_ID = gql`
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
`;

export const QUERY_GET_COMPANY_BY_ID = gql`
   query GetCompanyById($companyId: ID!) {
      company(id: $companyId) {
         name
         description
         jobs {
            id
            title
            description
         }
      }
   }
`;
