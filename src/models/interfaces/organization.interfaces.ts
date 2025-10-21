import { Document } from 'mongoose';

interface IChecklist {
  name: string;
}

interface ISecurityPattern {
  title: string;
  checklists: IChecklist[];
}

interface IOpenAI {
  apiKey: string;
}

interface ICredentials {
  openai: IOpenAI;
}

interface IOrganization extends Document {
  name: string;
  pilotCount: number;
  avgFlightHours: number;
  fleetSize: number;
  aiPrompt: string;
  securityPatterns: ISecurityPattern[];
  credentials: ICredentials;
}

export type { ISecurityPattern, IOrganization };
