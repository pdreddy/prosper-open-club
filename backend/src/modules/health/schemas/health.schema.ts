import { z } from 'zod';

export const healthQuerySchema = z.object({
  verbose: z
    .string()
    .optional()
    .transform((value) => value === 'true'),
});

export type HealthQuery = z.infer<typeof healthQuerySchema>;
