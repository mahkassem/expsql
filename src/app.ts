import express, { Application, json } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 3000;

/**
 * ? Middlewares
 */
app.use(
    cors(),
    helmet(),
    json(),
    morgan('dev')
);

/**
 * ? Routes
 */
app.use('/api', routes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

export default app;