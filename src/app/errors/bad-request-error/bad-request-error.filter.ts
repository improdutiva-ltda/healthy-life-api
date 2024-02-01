import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { BadRequestError } from './bad-request-error';

@Catch(BadRequestError)
export class BadResquestErrorFilter implements ExceptionFilter {
  catch(exception: BadRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.BAD_REQUEST).json({
      statusCode: HttpStatus.BAD_REQUEST,
      message: exception.message,
    });
  }
}
