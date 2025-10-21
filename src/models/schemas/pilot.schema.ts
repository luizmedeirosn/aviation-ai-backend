import mongoose, { Schema } from 'mongoose';
import { PilotRole } from '../../utils/enums/PilotEnums.js';
import type { IPilot } from '../interfaces/pilot.interfaces.js';

const PilotSchema: Schema = new Schema({
  organization: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },

  name: { type: String, unique: true, required: true },
  flightHours: { type: Number, required: true },
  role: {
    type: String,
    enum: Object.values(PilotRole),
    default: PilotRole.COPILOT,
    required: true,
  },
});

export default mongoose.model<IPilot>('Pilot', PilotSchema);
