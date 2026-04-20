import z from 'zod';

const mailContactSchema = z.object({
    fullName: z
        .string({ message: 'Full name is required' })
        .trim()
        .min(2, { message: 'Full name must be at least 2 characters long' })
        .max(100, { message: 'Full name must be less than 100 characters long' }),

    email: z
        .string({ message: 'Email is required' })
        .trim()
        .toLowerCase()
        .email({ message: 'Please provide a valid email address' }),
});

export default mailContactSchema;