import { Document } from 'mongoose';
import { PilotRole } from '../../utils/enums/PilotEnums.js';
import type { IOrganization } from './organization.interfaces.js';

interface IPilot extends Document {
  organization: IOrganization['_id'];

  name: string;
  role: PilotRole;
  flightHours: number;
}

export type { IPilot };
