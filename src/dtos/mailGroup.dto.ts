import z from 'zod';

import { mailgroupSchema } from '../validators/mailGroup.validator';

type MailGroupDto = z.infer<typeof mailgroupSchema>;

export default MailGroupDto;