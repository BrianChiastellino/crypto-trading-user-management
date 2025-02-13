import 'express';
import { User } from '../models/user.model';
import { UserPayloadDTO } from '../dtos/user-payload.dto';

declare global {
    namespace Express {
        interface Request {
            userPayloadDTO : UserPayloadDTO;
        }
    }
}