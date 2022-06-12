import { gql } from "@apollo/client";
import * as fragments from "./fragments";

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
         ...JobDetail,
         description
      }
   }
   ${fragments.FRAGMENT_JOB_DETAIL}
`;

export const QUERY_GET_COMPANY_BY_ID = gql`
   query GetCompanyById($companyId: ID!) {
      company(id: $companyId) {
         id,
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
