import { z } from 'zod';

export const createTodoSchema = z
  .object({
    title: z.string(),
  })
  .required();

export type CreateTodoDto = z.infer<typeof createTodoSchema>;
