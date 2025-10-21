import type { IOrganization, ISecurityPattern } from '../../models/interfaces/organization.interfaces.js';
import type { IPilot } from '../../models/interfaces/pilot.interfaces.js';
import type { IAnalysis } from '../../models/interfaces/analysis.interfaces.js';

export default class UtilityMethods {
  public static generateTranscriptS3Key = (organization: IOrganization, pilot: IPilot, analysis: IAnalysis) => {
    return `transcripts/${organization._id}/${pilot._id}/${analysis._id}/${new Date(analysis.createdAt).toISOString()}.pdf`;
  };

  public static formatPatternsForAI = (securityPatterns: Array<ISecurityPattern>): string => {
    return securityPatterns
      .map((pattern) => {
        const checklists = pattern.checklists.map((c: any) => `    - ${c.name}`).join('\n');
        return `## ${pattern.title}\n${checklists}`;
      })
      .join('\n\n');
  };
}
