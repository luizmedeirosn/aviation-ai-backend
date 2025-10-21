export enum HttpStatusEnums {
  OK = 200,
  CREATED = 201,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
  EXTERNAL_SERVER_ERROR = 501,
}

export enum HttpStatusMessage {
  OK = 'Success',
  CREATED = 'Created',
  BAD_REQUEST = 'Bad Request',
  NOT_FOUND = 'Not Found',
  INTERNAL_SERVER_ERROR = 'Internal Server Error',
  EXTERNAL_SERVER_ERROR = 'External Server Error',

  DUPLICATE_ENTRY = 'Duplicate Entry',
}
