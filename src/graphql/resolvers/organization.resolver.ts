import Organization from '../../models/schemas/organization.schema.js';
import type { CreateOrganizationInput, UpdateOrganizationInput } from '../types/organization.inputs.js';

import NotFoundError from '../../utils/errors/NotFoundError.js';

export default {
  Query: {
    organizations: async () => {
      return Organization.find();
    },
    organization: async (_: any, { id }: { id: string }) => {
      const org = await Organization.findById(id).exec();
      if (!org) throw new NotFoundError('Organization not found.');
      return org;
    },
  },
  Mutation: {
    createOrganization: async (_: any, { input }: { input: CreateOrganizationInput }) => {
      return await new Organization(input).save();
    },
    updateOrganization: async (_: any, { id, input }: { id: string; input: UpdateOrganizationInput }) => {
      const org = await Organization.findByIdAndUpdate(id, input, { new: true, runValidators: true }).exec();
      if (!org) throw new NotFoundError('Organization not found.');
      return org;
    },
  },
};
