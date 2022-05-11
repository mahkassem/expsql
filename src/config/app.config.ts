import dotenv from 'dotenv';

dotenv.config();

const appConfig = {
    env: process.env.ENV || 'dev',
    port: Number(process.env.PORT) || 3000,
}

export default appConfig;