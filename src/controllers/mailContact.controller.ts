import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import MailContact from '../db/models/mailContact.model';
import MailContactDto from '../dtos/mailContact.dto';
import MailContactRepository from '../repositories/mailContact.repository';
import MailContactService from '../services/mailContact.service';
import { buildSuccessResponse } from '../utils/helpers/response.helper';

const mailContactService = new MailContactService(new MailContactRepository());

async function createContactHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const contactData: MailContactDto = req.body;
        const response: MailContact = await mailContactService.create(contactData);
        res.status(StatusCodes.CREATED).json(
            buildSuccessResponse<MailContact>('Contact is successfully created', response)
        );
    } catch (error) {
        next(error);
    }
}

export default {
    createContactHandler
};