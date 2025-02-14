
// middlewares
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import { authenticateJWT } from './middlewares/jwt.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';


// routes
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes'
import adminRouter from './routes/admin.routes'
import { authAdmin } from './middlewares/auth-admin.middleware';

const { APP_URL : urlApi } = process.env;
const app = express();

app.use( cors());

app.use( morgan('dev'));                                // registrar solicituds y repsuestas http
app.use( express.json());                               // express.json() para leer json

//todo agregar middleware de auth
app.use(`${ urlApi }/users`,authenticateJWT,
     userRouter                                         // Ruta de usuario común logueado
    )   

app.use(`${ urlApi }/auth`, authRouter )                // Ruta de autenticacion login y registro

app.use(`${urlApi}/admin`,
    authenticateJWT,                                    // authenticarJWT
    authAdmin,                                          //authenticarAdmin
    adminRouter                                         
)


app.use( errorHandler );                                // Este middleware siempre tiene que ir ultimo ya que se ejecutan en casacda los middleware


export default app;

