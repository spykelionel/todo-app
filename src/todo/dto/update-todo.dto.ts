import { z } from 'zod';

export const updateTodoSchema = z
  .object({
    title: z.string(),
  })
  .required();

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
