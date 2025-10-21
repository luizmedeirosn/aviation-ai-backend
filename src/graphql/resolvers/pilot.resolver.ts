import Pilot from '../../models/schemas/pilot.schema.js';
import Organization from '../../models/schemas/organization.schema.js';
import type { CreatePilotInput } from '../types/pilot.inputs.js';

export default {
  Query: {
    pilots: async (_: any, { organizationId }: { organizationId: string }) => {
      return Pilot.find({ organization: organizationId });
    },
    pilot: async (_: any, { id }: { id: string }) => {
      return Pilot.findById(id);
    },
  },
  Mutation: {
    createPilot: async (_: any, { input }: { input: CreatePilotInput }) => {
      return await new Pilot(input).save();
    },
    createPilots: async (_: any, { input }: { input: Array<CreatePilotInput> }) => {
      return await Pilot.insertMany(
        input.map((pilot) => ({ ...pilot, organization: pilot.organizationId })),
        { ordered: false },
      );
    },
  },
  Pilot: {
    organization: async (pilot: any) => {
      return Organization.findById(pilot.organization);
    },
  },
};
