import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const MUTATION_CREATE_JOB = gql`
   mutation CreateJob($createJobInput: CreateJobInput!) {
      job: createJob(createJobInput: $createJobInput) {
         ...JobDetail,
         description
      }
   }
   ${fragments.FRAGMENT_JOB_DETAIL}
`;

export const MUTATION_DELETE_JOB = gql`
   mutation DeleteJob($deleteJobId: ID!) {
      deleteJob(id: $deleteJobId) {
         id
         title
         description
         company {
            name
         }
      }
   }
`;
