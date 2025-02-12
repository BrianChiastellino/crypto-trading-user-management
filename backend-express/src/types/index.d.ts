import 'express';
import { User } from '../models/user.model';

declare global {
    namespace Express {
        interface Request {
            user: {
                id: string;
                admin: boolean;
            };
        }
    }
}