import { Company, Job } from "./db.js";

export const resolvers = {
  Query: {
    jobs: async () => Job.findAll(),
    job: async (_root, args) => {
      const { id } = args;
      return Job.findById(id);
    },
    company : async (_root, args) => {
      const { id } = args;
      return Company.findById(id);
    }
   },

  Job: {
    company: (job) => Company.findById(job.companyId)
  }
}