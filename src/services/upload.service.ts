import { UploadedFile } from "express-fileupload";
import config from "../config";

export const uploadFileAsync = async (file: UploadedFile, path?: string) => {
    try {
        const timestamp = Date.now();
        const fileName = `${timestamp}-${file.name}`;
        const pathJoin = (path ?? '') + '/' + `${fileName}`;
        const filePath = config.app.storageDir + '/' + pathJoin;
        await file.mv(filePath);
        return pathJoin;
    } catch (error) {
        throw error;
    }
};