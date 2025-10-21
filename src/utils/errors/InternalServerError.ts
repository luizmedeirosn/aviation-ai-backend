import BaseError from './BaseError.js';
import { HttpStatusEnums, HttpStatusMessage } from '../enums/HttpStatusEnums.js';

export default class InternalServerError extends BaseError {
  constructor(message?: string) {
    super(HttpStatusEnums.INTERNAL_SERVER_ERROR, message || HttpStatusMessage.INTERNAL_SERVER_ERROR);
  }
}
