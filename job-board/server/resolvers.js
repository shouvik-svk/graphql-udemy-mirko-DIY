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

  Mutation: {
    createJob: (_root, { createJobInput }, context) => {
      if (!context.auth) {
        throw new Error("Unauthorized");
      }
      return Job.create(createJobInput);
    },
    deleteJob: (_root, { id }) => {
      return Job.delete(id);
    },
    updateJob: (_root, { updateJobInput }) => {
      return Job.update(updateJobInput);
    }
  },

  Job: {
    company: (job) => Company.findById(job.companyId)
  },

  Company: {
    jobs: (company) => Job.findAll((job => job.companyId === company.id))
  }
}