import z from 'zod';

export const mailgroupSchema = z.object({
    name: z
        .string({ message: 'Group name is required' })
        .min(5, { message: 'Group name must be at least 5 characters long' })
        .max(50, { message: 'Group name must be less than 50 characters long' }),

    description: z
        .string()
        .max(500, { message: 'Description must be less than 500 characters long' })
        .optional(),

    totalContacts: z
        .number({ message: 'Total contacts must be a number' })
        .int({ message: 'Total contacts must be an integer' })
        .min(0, { message: 'Total contacts cannot be negative' })
        .optional(),

    createdBy: z
        .number({ message: 'Creator id is required' })
        .int({ message: 'Creator id must be an integer' })
        .positive({ message: 'Creator id must be greater than 0' }),
});

export const groupIdSchema = z.object({
    groupId: z.coerce
        .number({
            message: 'Group Id is required',
        })
        .int('Group Id must be an integer')
        .positive('Group Id must be greater than 0'),
});