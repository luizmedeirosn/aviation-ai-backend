import type { IOrganization } from '../../models/interfaces/organization.interfaces.js';
import { PilotRole } from '../../utils/enums/PilotEnums.js';

interface CreatePilotInput {
  organizationId: IOrganization['_id'];

  name: string;
  flightHours: number;
  role: PilotRole;
}

interface UpdatePilotInput {
  organizationId?: IOrganization['_id'];

  role?: PilotRole;
  name?: string;
  flightHours?: number;
}

export type { CreatePilotInput, UpdatePilotInput };
