import { HttpException, HttpStatus } from '@nestjs/common';

export class ServiceError extends Error {
    responseCode: HttpStatus;
    constructor(
        message: string,
        responseCode?: HttpStatus,
        options?: ErrorOptions,
    ) {
        super(message, options);
        this.responseCode = responseCode;
        Object.setPrototypeOf(this, ServiceError.prototype);
    }

    static toHttpException(error: ServiceError): HttpException {
        let responseCode = error.responseCode;
        if (responseCode == null) {
            responseCode = HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return new HttpException(error.message, responseCode);
    }
}
