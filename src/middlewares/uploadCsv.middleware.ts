import fs from 'fs';
import multer from 'multer';
import path from 'path';

import { BadRequestError } from '../utils/errors/app.error';

const uploadDir = path.resolve('tmp/uploads');

if(!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination(_req, _file, callback) {
        callback(null, uploadDir);
    },

    filename(_req, file, callback) {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname) || '.csv';
        callback(null, `mail-contacts-${uniqueSuffix}${ext}`);
    },
});

const csvFileFilter: multer.Options['fileFilter'] = (_req, file, callack) => {
    const isCsv = file.mimetype === 'text/csv' || file.originalname.toLowerCase().endsWith('.csv');

    if(!isCsv) {
        return callack(new BadRequestError('Only Csv files are allowed'));
    }

    callack(null, true);
};

const uploadCsv = multer({
    storage,
    fileFilter: csvFileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // -> 5 MB
    }
});

export default uploadCsv;