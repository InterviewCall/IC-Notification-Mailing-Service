import { z } from 'zod/v4';

const mailGroupContactSchema = z.object({
    groupId: z.number({ error: 'Group Id is required' }),
    contactId: z.number({ error: 'Contact Id is required' })
});

export default mailGroupContactSchema;