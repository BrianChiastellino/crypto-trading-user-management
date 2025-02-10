
// middlewares
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import { errorHandler } from './middlewares/error-handler.middleware';

// routes
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes'
import { validateEnvVariables } from './utils/env-check';

validateEnvVariables();                     // Validamos las variables de desarrollo que esten cargadas.

const app = express();
const { APP_URL : urlApi } = process.env;

app.use( cors());

app.use( morgan('dev'));                    // registrar solicituds y repsuestas http
app.use( express.json());                   // express.json() para leer json

//todo agregar middleware de auth
app.use(`${ urlApi }/users`, userRouter )   // Ruta de usuario común logueado

app.use(`${ urlApi }/auth`, authRouter )    // Ruta de autenticacion login y registro



app.use( errorHandler );                    // Este middleware siempre tiene que ir ultimo ya que se ejecutan en casacda los middleware


export default app;

