import { PublishCommand, SNS } from "@aws-sdk/client-sns";

import { env } from "~/env.js";

// JS SDK v3 does not support global configuration.
// Codemod has attempted to pass values to each service client in this file.
// You may need to update clients outside of this file, if they use global config.

const sns = new SNS({
  region: env.C_AWS_REGION,
  credentials: {
    accessKeyId: env.C_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.C_AWS_SECRET_ACCESS_KEY
  }
});

export async function sendSnsOTP(phoneNumber: string, otp: string) {
  const params = {
    Message: `Your OTP is: ${otp}. The OTP will expire in 10 minutes. - Celeritaz Health`,
    PhoneNumber: phoneNumber
  };

  try {
    const command = new PublishCommand(params);
    await sns.send(command);
    console.log(`OTP sent to ${phoneNumber}: ${otp}`);
    return otp;
  } catch (err) {
    console.error("Error sending OTP:", err);
  }
}
