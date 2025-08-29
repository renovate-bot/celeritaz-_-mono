import { S3 } from "@aws-sdk/client-s3";

import { env } from "~/env.js";

export const s3 = new S3({
  region: env.C_AWS_REGION,
  credentials: {
    accessKeyId: env.C_AWS_ACCESS_KEY_ID,
    secretAccessKey: env.C_AWS_SECRET_ACCESS_KEY
  }
});
