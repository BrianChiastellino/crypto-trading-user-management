import { CustomError } from "../utils/custom-error";

export class UnauthorizedError extends CustomError {
    
    public statusCode: number = 401;

    constructor ( public message : string ) {
        super( message );


        Object.setPrototypeOf( this, UnauthorizedError.prototype );
    };

    public serialize(): { message: string; } {
        return { message : this.message}
    };

}