import BaseError from './BaseError.js';
import { HttpStatusEnums, HttpStatusMessage } from '../enums/HttpStatusEnums.js';

export default class NotFoundError extends BaseError {
  constructor(message?: string) {
    super(HttpStatusEnums.NOT_FOUND, message || HttpStatusMessage.NOT_FOUND);
  }
}
