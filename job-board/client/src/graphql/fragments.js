import { gql } from "@apollo/client";

export const FRAGMENT_JOB_DETAIL = gql`
   fragment JobDetail on Job {
      id
      title
      company {
         id
         name
      }
   }
`;
