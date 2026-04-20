import { z } from 'zod/v4';

import mailGroupContactSchema from '../validators/mailGroupContact.validator';

type MailGroupContactDto = z.infer<typeof mailGroupContactSchema>;

export default MailGroupContactDto;