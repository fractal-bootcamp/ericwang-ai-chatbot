import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { session } from "~/server/db/schema";

export const sessionRouter = createTRPCRouter({
  create: publicProcedure
    .input(z.object({
      id: z.string(),
      createdAt: z.date(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(session).values({
        id: input.id,
        createdAt: input.createdAt,
      });
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    const sessions = await ctx.db.query.session.findMany({
      orderBy: (session, { desc }) => [desc(session.createdAt)],
    });
    
    return sessions ?? null;
  }),
  delete: publicProcedure
    .input(z.object({
      id: z.string(),
    }))
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(session).where(eq(session.id, input.id));
  }),
  getLatest: publicProcedure.query(async ({ ctx }) => {
    const latestSession = await ctx.db.query.session.findFirst({
      orderBy: (session, { desc }) => [desc(session.createdAt)],
    });
    return latestSession ?? null;
  }),
});