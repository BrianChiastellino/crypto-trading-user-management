import { User } from "./user.model";


export interface LoginResponse {
  token : string;
  user : User;
}
