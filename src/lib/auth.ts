import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { phoneNumber } from "better-auth/plugins";
import { db } from "../server/db";
import { generateOTP } from "./utils";
import { sendOTP } from "~/server/aws/send-otp";

export const auth = betterAuth({
  database: drizzleAdapter(db, { provider: "pg" }),
  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber }) => {
        try {
          const newOtp = generateOTP();
          await sendOTP(phoneNumber, newOtp);
          console.log("OTP sent to", phoneNumber, ":", newOtp);
        } catch (error) {
          console.error("Error sending OTP:", error);
          throw new Error("Failed to send OTP");
        }
      },
    }),
  ],
});
