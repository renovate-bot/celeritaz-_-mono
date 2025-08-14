import z from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { eq } from "drizzle-orm";
import { patient } from "~/server/db/schema";

export const patientRouter = createTRPCRouter({
  getPatientById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      const { id } = input;
      const patientData = await ctx.db.query.patient.findFirst({
        where: eq(patient.patientId, id),
      });
      return patientData;
    }),
});
