import { ServiceError } from '@app/common/common.errors';
import { ArgumentsHost, Catch, Injectable, Logger } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';

@Injectable()
@Catch()
export class AllExceptionsFilter extends BaseExceptionFilter {
    private logger = new Logger('Exceptions');

    catch(exception: Error, host: ArgumentsHost): void {
        let wrappedException = exception;
        if (exception instanceof ServiceError) {
            this.logger.error(exception.message, exception.stack);
            wrappedException = ServiceError.toHttpException(exception);
            if (exception.cause)
                this.logger.warn(
                    `Cause: ${(exception.cause as Error).message}`,
                    (exception.cause as Error).stack,
                );
        } else {
            this.logger.error(exception.message, exception.stack);
            if (exception.cause)
                this.logger.error(
                    `Cause: ${(exception.cause as Error).message}`,
                    (exception.cause as Error).stack,
                );
        }
        super.catch(wrappedException, host);
    }
}
