import { User } from "../models/user.model";

export class UserPayloadDTO {
    public readonly id : User['id'];
    public readonly admin : User['admin'];
};