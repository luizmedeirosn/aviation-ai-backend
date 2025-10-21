import Analysis from '../../models/schemas/analysis.schema.js';
import Organization from '../../models/schemas/organization.schema.js';
import Pilot from '../../models/schemas/pilot.schema.js';

import NotFoundError from '../../utils/errors/NotFoundError.js';
import { getPresignedDownloadUrl } from '../../services/s3.service.js';
import type { IAnalysis } from '../../models/interfaces/analysis.interfaces.js';

export default {
  Query: {
    analyses: async (_: any, { organizationId }: { organizationId: string }) => {
      const filter = organizationId ? { organization: organizationId } : {};
      return Analysis.find(filter).exec();
    },

    analysis: async (_: any, { id }: { id: string }) => {
      const analysis = await Analysis.findById(id).exec();
      if (!analysis) {
        throw new NotFoundError('Analysis not found');
      }
      return analysis;
    },
  },

  Analysis: {
    organization: async (analysis: IAnalysis) => {
      return Organization.findById(analysis.organization);
    },

    pilot: async (analysis: IAnalysis) => {
      return Pilot.findById(analysis.pilot);
    },

    downloadUrl: async (analysis: IAnalysis) => {
      return await getPresignedDownloadUrl(analysis.s3Key);
    },
  },
};
