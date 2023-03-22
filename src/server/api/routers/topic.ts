import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const topicRouter = createTRPCRouter({
    getAll: protectedProcedure
    .query(({ ctx }) => {
            return ctx.prisma.topic.findMany({
                where:{
                    userId: ctx.session.user.id,
                }
            });
          }),
    create: protectedProcedure
    .input(z.object({title: z.string()}))
    .mutation(({ctx, input})=>{
        return ctx.prisma.topic.create({
            data:{
                title: input.title,
                userId: ctx.session.user.id
            }
        })

    })
//   hello: publicProcedure
//     .input(z.object({ text: z.string() }))
//     .query(({ input }) => {
//       return {
//         greeting: `Hello ${input.text}`,
//       };
//     }),

//   getAll: publicProcedure.query(({ ctx }) => {
//     return ctx.prisma.example.findMany();
//   }),

//   getSecretMessage: protectedProcedure.query(() => {
//     return "you can now see this secret message!";
//   }),
});
