import { CustomError } from './custom-error';

export class BadRequestRerror extends CustomError {
    statusCode = 400;

    constructor(public message: string) {
        super(message);

        Object.setPrototypeOf(this, BadRequestRerror.prototype);
    }

    serializeErrors() {
        return [{ message: this.message }];
    }
}