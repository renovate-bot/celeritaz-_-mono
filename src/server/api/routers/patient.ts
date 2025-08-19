import { eq } from "drizzle-orm";
import z from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  address,
  employerDetails,
  kinDetails,
  patient,
  payerDetails,
  referralDetails,
  remarks
} from "~/server/db/schema";

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
  getPatientCompleteDetailsById: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .query(async ({ input, ctx }) => {
      try {
        if (!input.id) {
          throw new Error("Address Id is required");
        }
        const demographicDetails = await ctx.db.query.patient.findFirst({
          where: eq(patient.patientId, input.id)
        });
        const addressDetails = await ctx.db.query.address.findFirst({
          where: eq(address.addressId, demographicDetails?.addressId ?? "")
        });
        const permanentAddressDetails = await ctx.db.query.address.findFirst({
          where: eq(address.addressId, demographicDetails?.permanentAddressId ?? "")
        });
        const kinAddressDetails = await ctx.db.query.address.findFirst({
          where: eq(address.addressId, demographicDetails?.kinAddressId ?? "")
        });
        const referralDetailsData = await ctx.db.query.referralDetails.findFirst({
          where: eq(referralDetails.patientId, input.id)
        });
        const employerDetailsData = await ctx.db.query.employerDetails.findFirst({
          where: eq(employerDetails.patientId, input.id)
        });
        const payerDetailsData = await ctx.db.query.payerDetails.findFirst({
          where: eq(payerDetails.patientId, input.id)
        });
        const kinDetailsData = await ctx.db.query.kinDetails.findFirst({
          where: eq(kinDetails.patientId, input.id)
        });
        const remarkDetailData = await ctx.db.query.remarks.findFirst({
          where: eq(remarks.patientId, input.id)
        });
        return {
          demographicDetails,
          addressDetails,
          permanentAddressDetails,
          referralDetailsData,
          employerDetailsData,
          payerDetailsData,
          kinAddressDetails,
          kinDetailsData,
          remarkDetailData
        };
      } catch (err) {
        console.log(err);
      }
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
