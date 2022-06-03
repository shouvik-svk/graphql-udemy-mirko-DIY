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
    createJob: (_root, { title, description, companyId }) => {
      return Job.create({ title, description, companyId });
    }
  },

  Job: {
    company: (job) => Company.findById(job.companyId)
  },

  Company: {
    jobs: (company) => Job.findAll((job => job.companyId === company.id))
  }
}