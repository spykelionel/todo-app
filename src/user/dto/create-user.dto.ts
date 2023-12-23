import { z } from 'zod';

export const createUserSchema = z
  .object({
    name: z.string().min(3, 'Name can not be less than 3 characters.'),
    email: z.string().email('Email is not valid'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
  })
  .required();

export type CreateUserDto = z.infer<typeof createUserSchema>;
