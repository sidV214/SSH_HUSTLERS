import multer from 'multer';
import { env } from '../config/env.js';

// Use memory storage to process uploads on the fly without writing to disk
const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf'];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG and PDF are allowed.'), false);
    }
};

export const upload = multer({
    storage,
    limits: {
        fileSize: env.upload.maxFileSize
    },
    fileFilter
});
