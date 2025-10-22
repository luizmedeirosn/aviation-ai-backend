import { PDFParse, type TextResult } from 'pdf-parse';

import type { UploadedFile } from 'express-fileupload';
import type { DocumentInitParameters } from 'pdfjs-dist/types/src/display/api.js';

import UtilityMethods from '../utils/functions/UtilityMethods.js';

import Analysis from '../models/schemas/analysis.schema.js';
import Organization from '../models/schemas/organization.schema.js';
import Pilot from '../models/schemas/pilot.schema.js';
import { AnalysisStatus } from '../utils/enums/AnalysisEnums.js';

import NotFoundError from '../utils/errors/NotFoundError.js';

import type { IAnalysis } from '../models/interfaces/analysis.interfaces.js';

import { aiProcessTranscript } from './ai.service.js';
import { uploadToS3 } from './s3.service.js';

/* main methods */

const processNewTranscript = async (pdfFile: UploadedFile): Promise<void> => {
  const methodKey = '[processNewTranscript]';

  let analysis: IAnalysis | undefined;
  try {
    console.info(`${methodKey} - ${new Date()} - start`);

    const options: DocumentInitParameters = { data: pdfFile.data };
    const parser = new PDFParse(options);
    const textResult: TextResult = await parser.getText();
    const transcriptContent: string = textResult.text;

    const { company, pilot: pilotName }: any = JSON.parse(_cleanPdfTextForJson(transcriptContent));

    const organization = await Organization.findOne({ name: company }).exec();
    if (!organization) {
      throw new NotFoundError('Organization not found.');
    }

    const pilot = await Pilot.findOne({ name: pilotName, organization: organization._id }, { _id: 1 }).exec();
    if (!pilot) {
      throw new NotFoundError('Pilot not found.');
    }

    analysis = new Analysis({
      organization: organization._id,
      pilot: pilot._id,
      status: AnalysisStatus.PROCESSING,
    });
    await analysis.save();

    const s3Key = UtilityMethods.generateTranscriptS3Key(organization, pilot, analysis);
    await uploadToS3(s3Key, pdfFile.data, pdfFile.mimetype);
    analysis.s3Key = s3Key;

    analysis.patterns = await aiProcessTranscript(organization, transcriptContent);
    analysis.status = AnalysisStatus.COMPLETED;
    analysis.updatedAt = new Date();

    await analysis.save();

    console.info(`${methodKey} - ${new Date()} - success`, JSON.stringify(analysis));
  } catch (error) {
    console.error(`${methodKey} - ${new Date()}`, error);
    if (analysis && analysis.status === AnalysisStatus.PROCESSING) {
      analysis.status = AnalysisStatus.FAILED;
      analysis.updatedAt = new Date();
      await analysis.save();
    }
  }
};

/* helpers */

const _cleanPdfTextForJson = (text: string): string => text.replace(/--\s*\d+\s+of\s+\d+\s*--\s*/g, '').trim();

export { processNewTranscript };
