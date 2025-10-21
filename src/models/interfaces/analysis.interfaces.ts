import { Document } from 'mongoose';
import type { IOrganization } from './organization.interfaces.js';
import type { IPilot } from './pilot.interfaces.js';

import { AnalysisStatus } from '../../utils/enums/AnalysisEnums.js';

interface IChecklistItem {
  name: string;
  passed: boolean;
}

interface IPatternFeedback {
  title: string;
  feedback: string;
  checklists: IChecklistItem[];
}

interface IAnalysis extends Document {
  organization: IOrganization['_id'];
  pilot: IPilot['_id'];

  status: AnalysisStatus;
  patterns: IPatternFeedback[];

  updatedAt: Date;
  createdAt: Date;

  s3Key: string;
  downloadUrl: string;
}

export type { IPatternFeedback, IAnalysis };
