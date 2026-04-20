import { Router } from 'express';

import mailGroupController from '../../controllers/mailGroup.controller';
import { validateRequestBody, validateRequestParams } from '../../validators';
import { groupIdSchema, mailgroupSchema } from '../../validators/mailGroup.validator';

const mailGroupRouter = Router();

mailGroupRouter.post('/create', validateRequestBody(mailgroupSchema), mailGroupController.createGroupHandler);

mailGroupRouter.get('/', mailGroupController.getAllGroups);

mailGroupRouter.get('/:groupId', validateRequestParams(groupIdSchema), mailGroupController.getGroupById);

mailGroupRouter.get('/:groupId/contacts', validateRequestParams(groupIdSchema), mailGroupController.getAllContactsInGroupHandler);

export default mailGroupRouter;