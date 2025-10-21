import expressFileUpload from 'express-fileupload';
import type { Request, Response } from 'express';

import { HttpStatusEnums, HttpStatusMessage } from '../utils/enums/HttpStatusEnums.js';

import BaseError from '../utils/errors/BaseError.js';
import BadRequestError from '../utils/errors/BadRequestError.js';

import { processNewTranscript } from '../services/analysis.service.js';

export const uploadTranscript = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req.files || !Object.keys(req.files).length) {
      throw new BadRequestError('No file uploaded.');
    }

    const pdfFile = req.files.transcript as expressFileUpload.UploadedFile;
    processNewTranscript(pdfFile);

    return res.status(HttpStatusEnums.CREATED).send(HttpStatusMessage.OK);
  } catch (error) {
    console.error(`[uploadTranscript] - ${new Date()}`, error);
    return error instanceof BaseError
      ? res.status(error.getStatusCode()).send(error.getMessage())
      : res.status(HttpStatusEnums.INTERNAL_SERVER_ERROR).send(HttpStatusMessage.INTERNAL_SERVER_ERROR);
  }
};
