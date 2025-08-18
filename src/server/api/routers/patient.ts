import { eq } from "drizzle-orm";
import z from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { patient } from "~/server/db/schema";

export const patientRouter = createTRPCRouter({
  getPatientById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const patientData = await ctx.db.query.patient.findFirst({
        where: eq(patient.patientId, id)
      });
      return patientData;
    }),
  updateProfilePhoto: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        avatar: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { patientId, avatar } = input;
      await ctx.db.update(patient).set({ imgUrl: avatar }).where(eq(patient.patientId, patientId));
    })
});
