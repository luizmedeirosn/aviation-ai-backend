interface SecurityPatternChecklistInput {
  name: string;
}

interface SecurityPatternInput {
  title: string;
  checklists: Array<SecurityPatternChecklistInput>;
}

interface OpenAiInput {
  apikey: string;
}

interface OrganizationCredentialsInput {
  openai: OpenAiInput;
}

interface CreateOrganizationInput {
  name: string;
  pilotCount: number;
  avgFlightHours: number;
  fleetSize: number;
  aiPrompt: string;
  securityPatterns: Array<SecurityPatternInput>;
  credentials?: OrganizationCredentialsInput;
}

interface UpdateOrganizationInput {
  name?: string;
  pilotCount?: number;
  avgFlightHours?: number;
  fleetSize?: number;
  aiPrompt?: string;
  securityPatterns?: Array<SecurityPatternInput>;
  credentials?: OrganizationCredentialsInput;
}

export type {
  SecurityPatternChecklistInput,
  SecurityPatternInput,
  OpenAiInput,
  OrganizationCredentialsInput,
  CreateOrganizationInput,
  UpdateOrganizationInput,
};
