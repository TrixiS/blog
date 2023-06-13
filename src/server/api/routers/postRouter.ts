import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.post.findMany({
      select: {
        id: true,
        title: true,
        createdAt: true,
        content: false,
      },
    });
  }),
  add: protectedProcedure
    .input(z.object({ title: z.string().min(1), content: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.post.create({
        data: { title: input.title, content: input.content },
      });
    }),
});
