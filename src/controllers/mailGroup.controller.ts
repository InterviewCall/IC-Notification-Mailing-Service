import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import MailContact from '../db/models/mailContact.model';
import MailGroup from '../db/models/mailGroup.model';
import MailGroupDto from '../dtos/mailGroup.dto';
import MailGroupRepository from '../repositories/mailGroup.repository';
import MailGroupService from '../services/mailGroup.service';
import { buildSuccessResponse } from '../utils/helpers/response.helper';

const mailGroupService = new MailGroupService(new MailGroupRepository());

async function createGroupHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const groupData: MailGroupDto = req.body;
        const response: MailGroup = await mailGroupService.create(groupData);
        res.status(StatusCodes.CREATED).json(
            buildSuccessResponse<MailGroup>('Group is successfully created', response)
        );
    } catch (error) {
        next(error);
    }
}

async function getAllGroups(_req: Request, res: Response, next: NextFunction) {
    try {
        const response: MailGroup[] = await mailGroupService.findAllGroups();
        res.status(StatusCodes.OK).json(
            buildSuccessResponse<MailGroup[]>('Successfully fetched all the groups', response)
        );
    } catch (error) {
        next(error);
    }
}

async function getGroupById(req: Request, res: Response, next: NextFunction) {
    try {
        const groupId: number = Number(req.params.groupId);
        const response: MailGroup = await mailGroupService.findGroupById(groupId);
        res.status(StatusCodes.OK).json(
            buildSuccessResponse<MailGroup>('Successfully fetched the group details', response)
        );
    } catch (error) {
        next(error);
    }
}

async function getAllContactsInGroupHandler(req: Request, res: Response, next: NextFunction) {
    try {
        const groupId: number = Number(req.params.groupId);
        const response: MailContact[] = await mailGroupService.findAllContactsByGroupId(groupId);
        res.status(StatusCodes.OK).json(
            buildSuccessResponse<MailContact[]>('All contacts are found successfully', response)
        );
    } catch (error) {
        next(error);
    }
}

export default {
    createGroupHandler,
    getAllContactsInGroupHandler,
    getAllGroups,
    getGroupById
};