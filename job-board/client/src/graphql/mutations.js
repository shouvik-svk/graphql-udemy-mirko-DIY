import { gql } from "@apollo/client";
import * as fragments from "./fragments";

export const MUTATION_CREATE_JOB = gql`
   mutation CreateJob($createJobInput: CreateJobInput!) {
      job: createJob(createJobInput: $createJobInput) {
         ...JobDetail,
         description
      }
      ${fragments.FRAGMENT_JOB_DETAIL}
   }
`;
