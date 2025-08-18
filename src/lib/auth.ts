import { TRPCError } from "@trpc/server";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";
import { eq } from "drizzle-orm";

import { sendSnsOTP } from "~/server/aws/send-otp";
import { patient } from "~/server/db/schema";

import { db } from "../server/db";

import { generateOTP } from "./utils";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  session: {
    expiresIn: 60 * 60 * 24
  },
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber }) => {
        const newOtp = generateOTP();
        const existingUser = await db.query.patient.findFirst({
          where: eq(patient.mobile, phoneNumber)
        });
        // if (!existingUser) {
        //   throw new TRPCError({
        //     code: "NOT_FOUND",
        //     message: "User does not exist with this phone number",
        //   });
        // }
        await sendSnsOTP(phoneNumber, newOtp);
        console.log("OTP sent to", phoneNumber, ":", newOtp);
      }
    })
  ]
});
