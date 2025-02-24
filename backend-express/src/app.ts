
// middlewares
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import { authenticateJWT } from './middlewares/jwt.middleware';
import { authAdmin } from './middlewares/auth-admin.middleware';
import { authUser } from './middlewares/auth-user.middleware';
import { noAuth } from './middlewares/no-auth.middleware';
import { errorHandler } from './middlewares/error-handler.middleware';


// routes
import userRouter from './routes/user.routes';
import authRouter from './routes/auth.routes'
import adminRouter from './routes/admin.routes'
import walletRouter from './routes/wallet.routes';
import transactionRouter from './routes/transaction.routes';


const { APP_URL : urlApi } = process.env;
const app = express();

app.use( cors());

app.use( morgan('dev'));                                // registrar solicituds y repsuestas http
app.use( express.json());                               // express.json() para leer json


app.use(`${ urlApi }/auth`,
    noAuth,                                             // Middleware para veriricar que no haya usuario logueado
    authRouter                                          // Ruta de autenticacion login y registro
)                           

app.use(`${urlApi}/users`,
    authUser,                                           // Middleare verificar usuario comun
    authenticateJWT,                                    // Middleware para veriicar token
    userRouter                                          // Ruta de usuario común logueado
)   

app.use(`${urlApi}/wallet`,
    authenticateJWT,                                    // Middleware para veriicar token
    authUser,                                           // Middleare verificar usuario comun
    walletRouter                                        // Ruta de billetera
)

app.use(`${urlApi}/transaction`,
    authenticateJWT,                                    // Middleware para veriicar token
    authUser,                                           // Middleare verificar usuario comun
    transactionRouter                                   // Ruta de transacciones
)

app.use(`${urlApi}/admin`,                               
    authenticateJWT,                                    // Middleware para veriicar token
    authAdmin,                                          // Middlewawre para verificar admin
    adminRouter                                         // Ruta de admin
)


app.use( errorHandler );                                // Este middleware siempre tiene que ir ultimo ya que se ejecutan en casacda los middleware


export default app;

