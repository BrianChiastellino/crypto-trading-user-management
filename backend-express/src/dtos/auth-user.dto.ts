import { User } from "../models/user.model";


export class UserAuthDTO {
    public readonly email : User['email'];
    public readonly document : User['document'];
    public readonly username : User['username'];
    public readonly password : User['password'];
};