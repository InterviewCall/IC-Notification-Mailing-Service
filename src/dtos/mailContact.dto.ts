import z from 'zod';

import mailContactSchema from '../validators/mailContact.validator';

type MailContactDto = z.infer<typeof mailContactSchema>;

export default MailContactDto;