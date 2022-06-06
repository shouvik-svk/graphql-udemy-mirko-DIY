import { Company, Job } from "./db.js";

function rejectIf(condition) {
  if (condition) {
    throw new Error('Unauthorized');
  }
}

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
    createJob: (_root, { createJobInput }, { user }) => {
      rejectIf(!user);
      return Job.create({ ...createJobInput, companyId: user.companyId });
    },
    deleteJob: async (_root, { id }, { user }) => {
      const job = await Job.findById(id);
      rejectIf(!user || job.companyId !== user.companyId);
      return Job.delete(id);
    },
    updateJob: async (_root, { updateJobInput }, { user }) => {
      const job = await Job.findById(updateJobInput.id);
      rejectIf(!user || job.companyId !== user.companyId);
      return Job.update({ ...updateJobInput, companyId: user.companyId });
    }
  },

  Job: {
    company: (job) => Company.findById(job.companyId)
  },

  Company: {
    jobs: (company) => Job.findAll((job => job.companyId === company.id))
  }
}