import { z } from 'zod';

import 'server-only';

const serverEnvSchema = z.object({
  FOOTBALL_API_KEY: z
    .string()
    .min(32, { message: 'Football API Key must be at least 32 characters' }),
});

export const serverEnv = serverEnvSchema.parse(process.env);

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof serverEnvSchema> {}
  }
}
