import AWS from "aws-sdk";

AWS.config.update({
  region: process.env.C_AWS_REGION,
  accessKeyId: process.env.AWS_SNS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SNS_SECRET_ACCESS_KEY,
});

const sns = new AWS.SNS();

export async function sendOTP(phoneNumber: string, otp: string) {
  const params = {
    Message: `Your OTP is: ${otp}. The OTP will expire in 10 minutes. - Celeritaz Health`,
    PhoneNumber: phoneNumber,
  };

  try {
    await sns.publish(params).promise();
    console.log(`OTP sent to ${phoneNumber}: ${otp}`);
    return otp;
  } catch (err) {
    console.error("Error sending OTP:", err);
  }
}
