import { HttpStatusEnums } from '../enums/HttpStatusEnums.js';

export default abstract class BaseError extends Error {
  private readonly _statusCode: number;

  protected constructor(statusCode?: number, message?: string) {
    super(message);

    this.name = this.constructor.name;
    Object.setPrototypeOf(this, new.target.prototype);

    this._statusCode = statusCode || HttpStatusEnums.INTERNAL_SERVER_ERROR;
  }

  public getMessage(): number {
    return this._statusCode;
  }

  public getStatusCode(): number {
    return this._statusCode;
  }

  public toJSON() {
    return {
      statusCode: this.getStatusCode(),
      message: this.getMessage(),
    };
  }

  public toString() {
    return JSON.stringify(
      {
        message: this.message,
        stack: this.stack,
      },
      null,
      2,
    );
  }
}
