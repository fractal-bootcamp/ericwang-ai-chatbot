import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { messages } from "~/server/db/schema";

export const messageRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      id: z.string(),
      content: z.string(),
      role: z.enum(['user', 'assistant']),
      sessionId: z.string(),
      createdAt: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(messages).values({
        id: input.id,
        content: input.content,
        role: input.role,
        sessionId: input.sessionId,
        createdAt: input.createdAt,
      });
    }),
});