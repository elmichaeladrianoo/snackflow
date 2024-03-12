import crypto from 'crypto';
import multer from 'multer';
import { extname, resolve } from 'path';

export default {
    upload(folder: string) {
        return {
            storage: multer.diskStorage({
                destination: resolve('/tmp', folder),
                filename: (request, file, callback) => {
                    const filehash = crypto.randomBytes(16).toString('hex');
                    const filename = `${filehash}-${file.originalname}`;

                    callback(null, filename); // Corrigido: Passar null como o primeiro parâmetro
                }
            })
        };
    }
};
