import { S3Client } from "@aws-sdk/client-s3";
const { AWS_S3_BUCKETS_REGION, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = process.env;

const credentials = {
  accessKeyId: AWS_ACCESS_KEY_ID as string,
  secretAccessKey: AWS_SECRET_ACCESS_KEY as string
};

export const s3Client = new S3Client({
  region: AWS_S3_BUCKETS_REGION,
  credentials: credentials
});
