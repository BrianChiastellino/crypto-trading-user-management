
// middlewares
import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

import { errorHandler } from './middlewares/error-handler.middleware';

// routes
import userRouter from './routes/user.routes';

const app = express();
const { APP_URL : urlApi } = process.env;

app.use( cors());

app.use( morgan('dev'));        // registrar solicituds y repsuestas http
app.use( express.json());       // express.json() para leer json

//todo agregar middleware de auth
app.use(`${urlApi}/users`, userRouter )



app.use( errorHandler );        // Este middleware siempre tiene que ir ultimo ya que se ejecutan en casacda los middleware


export default app;

