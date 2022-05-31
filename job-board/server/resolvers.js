import { Job } from "./db.js";

export const resolvers = {
  Query: {
    jobs: async () => Job.findAll()
  }
}