import { CustomError } from "../utils/custom-error";

export class BadRequestError extends CustomError {
    public statusCode: number = 400;

    constructor(public message: string) {
        super(message);
        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    public serialize(): { message: string } {
        return { message: this.message };
    }
}
