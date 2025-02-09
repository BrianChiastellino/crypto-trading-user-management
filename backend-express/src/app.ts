import cors from 'cors';
import morgan from 'morgan';
import express from 'express';

// middlewares

// routes

const app = express();

app.use( cors());

app.use( morgan('dev'));                // registrar solicituds y repsuestas http
app.use( express.json());               // express.json() para leer json



export default app;

