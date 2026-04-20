import { Router } from 'express';

import createContactAndAttachToGroupController from '../../controllers/createContactAndAttachToGroup.controller';
import uploadCsv from '../../middlewares/uploadCsv.middleware';
import validateCsvFileImportMapping from '../../middlewares/validateCsvImportMapping.middleware';
import { validateRequestBody, validateRequestParams } from '../../validators';
import mailContactSchema from '../../validators/mailContact.validator';
import { groupIdSchema } from '../../validators/mailGroup.validator';

const createContactAndAttachToGroupRouter = Router();

createContactAndAttachToGroupRouter.post(
    '/groups/:groupId/contacts/import',
    validateRequestParams(groupIdSchema),
    uploadCsv.single('file'),
    validateCsvFileImportMapping,
    createContactAndAttachToGroupController.createContactsAndAttachToGroupHandler,
);

createContactAndAttachToGroupRouter.post(
    '/groups/:groupId/contact/import',
    validateRequestParams(groupIdSchema),
    validateRequestBody(mailContactSchema),
    createContactAndAttachToGroupController.createContactAndAttachToGroupHandler,
);

export default createContactAndAttachToGroupRouter;
