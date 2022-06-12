import { gql } from "@apollo/client";

export const MUTATION_CREATE_JOB = gql`
   mutation CreateJob($createJobInput: CreateJobInput!) {
      job: createJob(createJobInput: $createJobInput) {
         id
         title
         description
         company {
            id
            name
         }
      }
   }
`;
