import mongoose, { Schema } from 'mongoose';
import { AnalysisStatus } from '../../utils/enums/AnalysisEnums.js';
import type { IAnalysis } from '../interfaces/analysis.interfaces.js';

const AnalysisSchema: Schema = new Schema({
  organization: { type: Schema.Types.ObjectId, ref: 'OrganizationSchema', required: true },
  pilot: { type: Schema.Types.ObjectId, ref: 'PilotSchema', required: true },

  status: {
    type: String,
    enum: Object.values(AnalysisStatus),
    default: AnalysisStatus.FAILED,
    required: true,
  },

  patterns: [
    {
      title: { type: String, required: true },
      feedback: { type: String, required: true },
      checklists: [
        {
          name: { type: String, required: true },
          passed: { type: Boolean, required: true },
        },
      ],
    },
  ],

  updatedAt: { type: Date, default: Date.now, required: true },
  createdAt: { type: Date, default: Date.now, required: true },

  // not required
  s3Key: { type: String },
  downloadUrl: { type: String },
});

export default mongoose.model<IAnalysis>('Analysis', AnalysisSchema);
