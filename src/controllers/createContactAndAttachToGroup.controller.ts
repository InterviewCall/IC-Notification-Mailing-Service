import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import MailContact from '../db/models/mailContact.model';
import MailContactDto from '../dtos/mailContact.dto';
import MailContactRepository from '../repositories/mailContact.repository';
import MailGroupRepository from '../repositories/mailGroup.repository';
import MailGroupContactRepository from '../repositories/mailGroupContact.repository';
import CreateContactAndAttachToGroupService from '../services/createMailContactAndAttachToGroup.service';
import { CreateContactsRequestBody, GroupIdRequestParams } from '../types/createContactAndAttachToGroup.type';
import { CsvMapping, CsvSummary } from '../types/csv.type';
import { buildSuccessResponse } from '../utils/helpers/response.helper';

const createContactAndAttachToGroupService = new CreateContactAndAttachToGroupService(new MailContactRepository(), new MailGroupRepository(), new MailGroupContactRepository());

async function createContactsAndAttachToGroupHandler(req: Request<GroupIdRequestParams, unknown, CreateContactsRequestBody>, res: Response, next: NextFunction) {
    try {
        const filePath = req.file?.path as string;
        const groupId: number = Number(req.params.groupId);
        const mapping: CsvMapping = req.body.mapping;

        const response: CsvSummary = await createContactAndAttachToGroupService.createContactsAndAttachToGroup(filePath, groupId, mapping);
        res.status(StatusCodes.CREATED).json(
            buildSuccessResponse<CsvSummary>('Successfully created all contacts and attached to the group', response)
        );
    } catch (error) {
        next(error);
    }
}

async function createContactAndAttachToGroupHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const groupId = Number(req.params.groupId);
        const contactData: MailContactDto = req.body;

        const response: MailContact = await createContactAndAttachToGroupService.createContactAndAttachToGroup(groupId, contactData);

        res.status(StatusCodes.CREATED).json(
            buildSuccessResponse<MailContact>('Successfully created the contact and attached to the group', response)
        );
    } catch (error) {
        next(error);
    }
}

export default {
    createContactsAndAttachToGroupHandler,
    createContactAndAttachToGroupHandler
};