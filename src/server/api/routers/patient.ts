import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from "drizzle-orm";
import z from "zod";

import { env } from "~/env";
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

import { generateIntegerUniqueId } from "../utils";

const DEFAULT_EXPIRES_IN = 21600; // 6 hours

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
  getProfilePhoto: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      try {
        const { id } = input;
        const { s3 } = ctx;
        const profilePhoto = await ctx.db.query.patient.findFirst({
          where: eq(patient.patientId, id)
        });

        if (!profilePhoto?.imgUrl) {
          return "/placeholder-user.jpg";
        }

        const command = new GetObjectCommand({
          Bucket: env.C_AWS_BUCKET_NAME,
          Key: profilePhoto?.imgUrl
        });

        const url = await getSignedUrl(s3, command, { expiresIn: DEFAULT_EXPIRES_IN });
        return url;
      } catch (err) {
        console.log(err);
        return "/placeholder-user.jpg";
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
      await ctx.db
        .update(patient)
        .set({ imgUrl: avatar, updatedAt: new Date(), updateUserId: ctx.session?.user.id })
        .where(eq(patient.patientId, patientId));
    }),
  editPersonalDetails: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        currentAddressId: z.string(),
        permanentAddressId: z.string().nullable(),
        firstName: z.string(),
        middleName: z.string().optional(),
        lastName: z.string().optional(),
        dob: z.coerce.date(),
        gender: z.string(),
        bloodGroup: z.enum(["O+", "B+", "A+", "AB+", "O-", "A-", "B-", "AB-", ""]).optional(),
        mobile: z.string(),
        alternateNumber: z.string().optional(),
        nationality: z.string(),
        email: z.string().optional(),
        motherName: z.string().optional(),
        fatherName: z.string().optional(),
        spouseName: z.string().optional(),
        currentAddress: z.object({
          addressLine1: z.string(),
          addressLine2: z.string().optional(),
          city: z.string(),
          state: z.string(),
          country: z.string(),
          pincode: z.string()
        }),
        permanentAddress: z
          .object({
            addressLine1: z.string(),
            addressLine2: z.string().optional(),
            city: z.string(),
            state: z.string(),
            country: z.string(),
            pincode: z.string()
          })
          .optional(),
        samePermenantAddress: z.boolean().default(false)
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { patientId } = input;
      await ctx.db
        .update(patient)
        .set({
          firstName: input.firstName,
          middleName: input.middleName,
          lastName: input.lastName,
          dob: input.dob.toISOString(),
          gender: input.gender,
          bloodGroup: input.bloodGroup,
          mobile: input.mobile,
          alternateNumber: input.alternateNumber,
          nationality: input.nationality,
          email: input.email,
          motherName: input.motherName,
          fatherName: input.fatherName,
          spouseName: input.spouseName,
          samePermanentAddress: input.samePermenantAddress,
          updatedAt: new Date(),
          updateUserId: ctx.session?.user.id
        })
        .where(eq(patient.patientId, patientId));

      await ctx.db
        .update(address)
        .set({
          addressLine1: input.currentAddress.addressLine1,
          addressLine2: input.currentAddress.addressLine2,
          city: input.currentAddress.city,
          state: input.currentAddress.state,
          country: input.currentAddress.country,
          pincode: input.currentAddress.pincode,
          updatedAt: new Date(),
          updateUserId: ctx.session?.user.id
        })
        .where(eq(address.addressId, input.currentAddressId));

      if (input.currentAddressId !== input.permanentAddressId && input.samePermenantAddress) {
        await ctx.db
          .update(patient)
          .set({
            permanentAddressId: input.currentAddressId,
            updatedAt: new Date(),
            updateUserId: ctx.session?.user.id
          })
          .where(eq(patient.patientId, patientId));

        if (input.permanentAddressId) {
          await ctx.db.delete(address).where(eq(address.addressId, input.permanentAddressId));
        }
      } else if (!input.samePermenantAddress) {
        if (input.permanentAddressId) {
          await ctx.db
            .update(address)
            .set({
              addressLine1: input.permanentAddress?.addressLine1,
              addressLine2: input.permanentAddress?.addressLine2,
              city: input.permanentAddress?.city,
              state: input.permanentAddress?.state,
              country: input.permanentAddress?.country,
              pincode: input.permanentAddress?.pincode,
              updatedAt: new Date(),
              updateUserId: ctx.session?.user.id
            })
            .where(eq(address.addressId, input.permanentAddressId));
        } else {
          const newId = generateIntegerUniqueId({ prefix: "address" });
          await ctx.db.insert(address).values({
            addressId: newId,
            addressLine1: input.permanentAddress?.addressLine1 ?? "",
            addressLine2: input.permanentAddress?.addressLine2,
            city: input.permanentAddress?.city ?? "",
            state: input.permanentAddress?.state ?? "",
            country: input.permanentAddress?.country ?? "",
            pincode: input.permanentAddress?.pincode ?? ""
          });
          await ctx.db
            .update(patient)
            .set({
              permanentAddressId: newId,
              updatedAt: new Date(),
              updateUserId: ctx.session?.user.id
            })
            .where(eq(patient.patientId, patientId));
        }
      }
    }),
  editPayerDetails: publicProcedure
    .input(
      z.object({
        payerId: z.string().optional(),
        patientId: z.string(),
        name: z.string({ required_error: "Required" }).optional(),
        selection: z.string({ required_error: "Required" }).optional(),
        type: z.string().optional(),
        group: z.string().optional(),
        subGroup: z.string().optional(),
        insuranceCompany: z.string().optional(),
        policyNumber: z.string().optional(),
        policyLimit: z.string().optional(),
        scheme: z.string().optional(),
        applicationFromDate: z.coerce.date().optional(),
        applicationToDate: z.coerce.date().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.payerId) {
        await ctx.db
          .update(payerDetails)
          .set({
            name: input.name,
            selection: input.selection,
            type: input.type,
            group: input.group,
            subGroup: input.subGroup,
            insuranceCompany: input.insuranceCompany,
            policyNumber: input.policyNumber,
            policyLimit: input.policyLimit,
            scheme: input.scheme,
            applicationFromDate: input.applicationFromDate,
            applicationToDate: input.applicationToDate,
            updatedAt: new Date(),
            updateUserId: ctx.session?.user.id
          })
          .where(eq(payerDetails.id, input.payerId));
      } else {
        const newId = generateIntegerUniqueId({ prefix: "payer" });
        await ctx.db.insert(payerDetails).values({
          id: newId,
          patientId: input.patientId,
          name: input.name,
          selection: input.selection,
          type: input.type,
          group: input.group,
          subGroup: input.subGroup,
          insuranceCompany: input.insuranceCompany,
          policyNumber: input.policyNumber,
          policyLimit: input.policyLimit,
          scheme: input.scheme,
          applicationFromDate: input.applicationFromDate,
          applicationToDate: input.applicationToDate,
          createdAt: new Date(),
          createUserId: ctx.session?.user.id
        });
      }
    }),
  editKinDetails: publicProcedure
    .input(
      z.object({
        kinId: z.string().optional(),
        patientId: z.string(),
        name: z.string({ required_error: "Required" }).optional(),
        relation: z.string({ required_error: "Required" }).optional(),
        mobileNumber: z.string({ required_error: "Required" }).optional(),
        gender: z.string({ required_error: "Required" }).optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.kinId) {
        await ctx.db
          .update(kinDetails)
          .set({
            kinName: input.name,
            relation: input.relation,
            mobileNumber: input.mobileNumber,
            gender: input.gender,
            updatedAt: new Date(),
            updateUserId: ctx.session?.user.id
          })
          .where(eq(kinDetails.id, input.kinId));
      } else {
        const newId = generateIntegerUniqueId({ prefix: "kin" });
        await ctx.db.insert(kinDetails).values({
          id: newId,
          patientId: input.patientId,
          kinName: input.name,
          relation: input.relation,
          mobileNumber: input.mobileNumber,
          gender: input.gender,
          createdAt: new Date(),
          createUserId: ctx.session?.user.id
        });
      }
    }),
  editReferralDetails: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        patientId: z.string(),
        leadSource: z.string().optional(),
        leadSourceName: z.string().optional(),
        leadSourceComment: z.string().optional(),
        referralType: z.string().optional(),
        referralName: z.string().optional(),
        referralComment: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.id) {
        await ctx.db
          .update(referralDetails)
          .set({
            leadSource: input.leadSource,
            leadSourceName: input.leadSourceName,
            leadSourceComment: input.leadSourceComment,
            referralType: input.referralType,
            referralName: input.referralName,
            referralComment: input.referralComment,
            updatedAt: new Date(),
            updateUserId: ctx.session?.user.id
          })
          .where(eq(referralDetails.id, input.id));
      } else {
        const newId = generateIntegerUniqueId({ prefix: "referral" });
        await ctx.db.insert(referralDetails).values({
          id: newId,
          patientId: input.patientId,
          leadSource: input.leadSource,
          leadSourceName: input.leadSourceName,
          leadSourceComment: input.leadSourceComment,
          referralType: input.referralType,
          referralName: input.referralName,
          referralComment: input.referralComment,
          createdAt: new Date(),
          createUserId: ctx.session?.user.id
        });
      }
    }),
  editEmployerDetails: publicProcedure
    .input(
      z.object({
        id: z.string().optional(),
        patientId: z.string(),
        employeeId: z.string().optional(),
        mobileNumber: z.string().optional(),
        email: z.string().optional(),
        relationship: z.string().optional(),
        employerName: z.string().optional(),
        employerMobileNumber: z.string().optional(),
        employerEmail: z.string().optional(),
        employerArea: z.string().optional(),
        employerPincode: z.string().optional(),
        employerCity: z.string().optional(),
        employerState: z.string().optional(),
        employerCountry: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      if (input.id) {
        await ctx.db
          .update(employerDetails)
          .set({
            employeeId: input.employeeId,
            employeeMobileNumber: input.mobileNumber,
            employeeEmail: input.email,
            relationship: input.relationship,
            employerName: input.employerName,
            employerMobileNumber: input.employerMobileNumber,
            employerEmail: input.employerEmail,
            employerArea: input.employerArea,
            employerPincode: input.employerPincode,
            employerCity: input.employerCity,
            employerState: input.employerState,
            employerCountry: input.employerCountry,
            updatedAt: new Date(),
            updateUserId: ctx.session?.user.id
          })
          .where(eq(employerDetails.id, input.id));
      } else {
        const newId = generateIntegerUniqueId({ prefix: "employer" });
        await ctx.db.insert(employerDetails).values({
          id: newId,
          patientId: input.patientId,
          employeeId: input.employeeId,
          employeeMobileNumber: input.mobileNumber,
          employeeEmail: input.email,
          relationship: input.relationship,
          employerName: input.employerName,
          employerMobileNumber: input.employerMobileNumber,
          employerEmail: input.employerEmail,
          employerArea: input.employerArea,
          employerPincode: input.employerPincode,
          employerCity: input.employerCity,
          employerState: input.employerState,
          employerCountry: input.employerCountry,
          createdAt: new Date(),
          createUserId: ctx.session?.user.id
        });
      }
    }),
  editIdentityDetails: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        identityType: z.string().optional(),
        identityNumber: z.string().optional(),
        streetNumber: z.string().optional(),
        area: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(patient)
        .set({
          identityType: input.identityType,
          identityNumber: input.identityNumber,
          streetNumber: input.streetNumber,
          area: input.area,
          updatedAt: new Date(),
          updateUserId: ctx.session?.user.id
        })
        .where(eq(patient.patientId, input.patientId));
    }),
  editOthersDetails: publicProcedure
    .input(
      z.object({
        patientId: z.string(),
        language: z.string().optional(),
        religion: z.string().optional(),
        occupation: z.string().optional(),
        disabilitiesType: z.array(z.string()).optional(),
        race: z.array(z.string()).optional(),
        identificationMarks: z.string().optional(),
        dietPreferences: z.string().optional(),
        familyIncome: z.string().optional(),
        frroNumber: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.db
        .update(patient)
        .set({
          language: input.language,
          religion: input.religion,
          occupation: input.occupation,
          disabilitiesType: input.disabilitiesType,
          race: input.race,
          identificationMarks: input.identificationMarks,
          dietPreferences: input.dietPreferences,
          familyIncome: input.familyIncome,
          frroNumber: input.frroNumber,
          updatedAt: new Date(),
          updateUserId: ctx.session?.user.id
        })
        .where(eq(patient.patientId, input.patientId));
    })
});
