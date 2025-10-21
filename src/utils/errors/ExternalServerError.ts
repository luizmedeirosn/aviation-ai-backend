import BaseError from './BaseError.js';
import { HttpStatusEnums, HttpStatusMessage } from '../enums/HttpStatusEnums.js';

export default class ExternalServerError extends BaseError {
  constructor(message?: string) {
    super(HttpStatusEnums.EXTERNAL_SERVER_ERROR, message || HttpStatusMessage.EXTERNAL_SERVER_ERROR);
  }
}
