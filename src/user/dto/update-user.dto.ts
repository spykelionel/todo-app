import { z } from 'zod';

export const updateUserSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    password: z.string(),
  })
  .required();

export type UpdateUserDto = z.infer<typeof updateUserSchema>;
