import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { UnauthorizedError } from './unauthorized-error';

@Catch()
export class UnauthorizedErrorFilter implements ExceptionFilter {
  catch(exception: UnauthorizedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(HttpStatus.UNAUTHORIZED).json({
      statusCode: HttpStatus.UNAUTHORIZED,
      message: exception.message,
    });
  }
}
