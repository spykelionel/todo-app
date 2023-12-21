import { z } from 'zod';

const updateTodoSchema = z
  .object({
    title: z.string(),
  })
  .required();

export type UpdateTodoDto = z.infer<typeof updateTodoSchema>;
