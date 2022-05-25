import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

const appConfig = {
    env: process.env.ENV || 'dev',
    port: Number(process.env.PORT) || 3000,
    storageDir: process.env.STORAGE_DIR as string,
}

appConfig.storageDir = path.join(__dirname, '../../', appConfig.storageDir);

export default appConfig;