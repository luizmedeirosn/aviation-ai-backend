import mongoose, { Schema } from 'mongoose';
import type { IOrganization } from '../interfaces/organization.interfaces.js';

const OrganizationSchema: Schema = new Schema({
  name: { type: String, unique: true, required: true },

  pilotCount: { type: Number, required: true },
  avgFlightHours: { type: Number, required: true },
  fleetSize: { type: Number, required: true },

  aiPrompt: { type: String, required: true },

  securityPatterns: [
    {
      title: { type: String, required: true },
      checklists: [
        {
          name: { type: String, required: true },
        },
      ],
    },
  ],

  credentials: {
    openai: {
      apiKey: { type: String, trim: true },
    },
  },
});

export default mongoose.model<IOrganization>('Organization', OrganizationSchema);
