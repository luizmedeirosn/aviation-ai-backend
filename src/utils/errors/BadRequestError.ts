import BaseError from './BaseError.js';
import { HttpStatusEnums, HttpStatusMessage } from '../enums/HttpStatusEnums.js';

export default class BadRequestError extends BaseError {
  constructor(message?: string) {
    super(HttpStatusEnums.BAD_REQUEST, message || HttpStatusMessage.BAD_REQUEST);
  }
}
