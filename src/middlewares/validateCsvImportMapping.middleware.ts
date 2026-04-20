import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';

import logger from '../configs/logger.config';
import { CsvMapping } from '../types/csv.type';
import { BadRequestError } from '../utils/errors/app.error';
import { csvImportMappingSchema } from '../validators/csvImport.validator';

const validateCsvFileImportMapping = (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.file) {
            throw new BadRequestError('CSV file is required');
        }

        if(!req.body.mapping) {
            throw new BadRequestError('Mapping is required for headers of csv file');
        }

        let parsedMapping: CsvMapping;

        try {
            parsedMapping = JSON.parse(req.body.mapping);
        } catch (error) {
            logger.error('Error coming from parse method of json', error);
            throw new BadRequestError('Mapping must be a valid JSON string');
        }

        const validateMapping = csvImportMappingSchema.safeParse(parsedMapping);
        req.body.mapping = validateMapping;

        next();
    } catch (error) {
        logger.error('Error coming after validation of csv file import checking', error);
        if(error instanceof ZodError) {
            return res.status(StatusCodes.BAD_REQUEST).json({
                success: false,
                message: error.errors[0].message,
                data: {},
                error
            });
        }

        next(error);
    }
};

export default validateCsvFileImportMapping;