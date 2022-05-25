import express, { Application, json, urlencoded } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import routes from './routes';
import config from './config';

const app: Application = express();
const port = config.app.port;

/**
 * Fileupload
 */
app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    createParentPath: true
}));

/**
 * ? Middlewares
 */
app.use(
    cors(),
    helmet(),
    json(),
    urlencoded({ extended: true }),
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