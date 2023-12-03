import { ApiError } from 'cookbook-shared/dtos';
import { Response } from 'express';
import { ResponseError } from '~models';

export function errorHandler(error: ResponseError, res: Response) {
  switch (error.type) {
    case 'generic':
      return res.status(error.status).send(
        ApiError.create({
          correlationId: res.correlationId,
          message: error.message,
          type: error.errorType,
          data: error.data,
        }),
      );

    case 'zod':
      // eslint-disable-next-line no-case-declarations
      const flattenedErrors = error.error.flatten();
      return res.status(400).send(
        ApiError.create({
          correlationId: res.correlationId,
          message: error.message,
          type: 'ValidationError',
          data: {
            fields: flattenedErrors.fieldErrors,
            form: flattenedErrors.formErrors,
          },
        }),
      );

    case 'mongoDb':
      return res.status(500).send(
        ApiError.create({
          correlationId: res.correlationId,
          type: 'MongoDb',
          message: 'MongoDB did not acknowledge operation',
        }),
      );

    case 'unknown':
      return res.status(500).send(
        ApiError.create({
          correlationId: res.correlationId,
          type: 'InternalServerError',
          message: 'Unhandled exception: ' + error.error,
          data: {
            error,
            fromEndpoint: true,
          },
        }),
      );
  }
}
