import { GetObjectCommand, PutObjectCommand, UploadPartCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

import { env } from "~/env.js";
import { s3Test } from "~/server/db/schema";

import { createTRPCRouter, publicProcedure } from "../trpc";
import { generateUniqueId } from "../utils";

const DEFAULT_EXPIRES_IN = 21600; // 6 hours

export const s3Router = createTRPCRouter({
  getObjects: publicProcedure.query(async ({ ctx }) => {
    const { s3 } = ctx;

    // Listing all objects in the bucket
    const listObjectsOutput = await s3.listObjectsV2({
      Bucket: env.C_AWS_BUCKET_NAME
    });

    return listObjectsOutput.Contents ?? [];
  }),

  getFileById: publicProcedure
    .input(z.object({ key: z.string() }))
    .query(async ({ ctx, input }) => {
      const { s3 } = ctx;

      const command = new GetObjectCommand({
        Bucket: env.C_AWS_BUCKET_NAME,
        Key: input.key
      });
      const url = await getSignedUrl(s3, command, { expiresIn: DEFAULT_EXPIRES_IN });
      return url;
    }),

  getFileByIds: publicProcedure
    .input(
      z.object({
        ids: z.array(z.string())
      })
    )
    .query(async ({ ctx, input }) => {
      const { s3 } = ctx;

      try {
        // Create an array to hold the URLs
        const urls = await Promise.all(
          input.ids.map(async (item) => {
            console.log("Fetching item:", item);
            const command = new GetObjectCommand({
              Bucket: env.C_AWS_BUCKET_NAME,
              Key: item
            });
            const url = await getSignedUrl(s3, command, { expiresIn: DEFAULT_EXPIRES_IN });
            console.log("Fetched item:", item, "URL:", url);
            return url;
          })
        );

        console.log("Result:", JSON.stringify(urls));
        return urls;
      } catch (error) {
        console.error("Error occurred:", error);
        throw error;
      }
    }),

  getStandardUploadPresignedUrl: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { key } = input;
      // Creating Presigned URL for regular uploads
      // This will be used to create a presigned URL that can be used to upload a file with a specific key to our S3 bucket.
      // This will be used for regular uploads, where the entire file is uploaded in a single request
      const { s3 } = ctx;

      const putObjectCommand = new PutObjectCommand({
        Bucket: env.C_AWS_BUCKET_NAME,
        Key: key
      });

      return await getSignedUrl(s3, putObjectCommand);
    }),
  // Creating Presigned URLs for multipart uploads
  // This will be used to create presigned URLs for multipart uploads.
  // This will be used to upload a file in multiple parts, so we need a presigned URL for each part.
  getMultipartUploadPresignedUrl: publicProcedure
    .input(z.object({ key: z.string(), filePartTotal: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const { key, filePartTotal } = input;
      const { s3 } = ctx;

      const uploadId = (
        await s3.createMultipartUpload({
          Bucket: env.C_AWS_BUCKET_NAME,
          Key: key
        })
      ).UploadId;

      if (!uploadId) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Could not create multipart upload"
        });
      }

      const urls: Promise<{ url: string; partNumber: number }>[] = [];

      for (let i = 1; i <= filePartTotal; i++) {
        const uploadPartCommand = new UploadPartCommand({
          Bucket: env.C_AWS_BUCKET_NAME,
          Key: key,
          UploadId: uploadId,
          PartNumber: i
        });

        const url = getSignedUrl(s3, uploadPartCommand).then((url) => ({
          url,
          partNumber: i
        }));

        urls.push(url);
      }

      return {
        uploadId,
        urls: await Promise.all(urls)
      };
    }),

  completeMultipartUpload: publicProcedure
    .input(
      z.object({
        key: z.string(),
        uploadId: z.string(),
        parts: z.array(
          z.object({
            ETag: z.string(),
            PartNumber: z.number()
          })
        )
      })
    )
    .mutation(async ({ ctx, input }) => {
      // This will be used to complete a multipart upload.
      // This will be used after all the parts have been uploaded to S3. Completing the upload will make the file available in the bucket and is a required step for S3.
      const { key, uploadId, parts } = input;
      const { s3 } = ctx;

      const completeMultipartUploadOutput = await s3.completeMultipartUpload({
        Bucket: env.C_AWS_BUCKET_NAME,
        Key: key,
        UploadId: uploadId,
        MultipartUpload: {
          Parts: parts
        }
      });

      return completeMultipartUploadOutput;
      // To complete a multipart upload, we need to provide the upload ID and the parts that were uploaded.
      // The parts are an array of objects that contain the part number and the ETag of the part.
      // The ETag is a unique identifier for the part that is returned when the part is uploaded.
      // The client will need to keep track of the ETag for each part and send it to the server when the upload is completed.
    }),

  test: publicProcedure.input(z.object({ key: z.string() })).mutation(async ({ input, ctx }) => {
    await ctx.db.insert(s3Test).values({
      id: generateUniqueId({ prefix: "s3Test" }),
      key: input.key
    });
  })
});
