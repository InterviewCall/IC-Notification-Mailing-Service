import z from 'zod';

export const csvImportMappingSchema = z
    .object({
        fullName: z
            .string({ message: 'Full name column mapping is required' })
            .trim()
            .min(1, { message: 'Full name column mapping is required' }),

        email: z
            .string({ message: 'Email column mapping is required' })
            .trim()
            .min(1, { message: 'Email column mapping is required' }),
    })
    .refine((data) => data.fullName !== data.email, {
        message: 'Full name and email cannot be mapped to the same column',
        path: ['email'],
    });