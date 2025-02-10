import { CustomError } from "../utils/custom-error";

export class DataBaseError extends CustomError {

    public statusCode: number = 500;

    constructor ( public message : string ) {
        super( message );


        Object.setPrototypeOf( this, DataBaseError.prototype );
    };

    public serialize(): { message: string; } {
        return { message : this.message}
    };

}