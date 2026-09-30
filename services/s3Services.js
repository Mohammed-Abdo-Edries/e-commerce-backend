const crypto = require("crypto");
const path = require("path");
const {
  PutObjectCommand,
  DeleteObjectCommand,
} = require("@aws-sdk/client-s3");

const s3 = require("../config/s3");

const uploadImageToS3 = async (file) => {
  const extension = path.extname(file.originalname).toLowerCase();
  const imageKey = `products/${crypto.randomUUID()}${extension}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageKey,
      Body: file.buffer,
      ContentType: file.mimetype,
    })
  );

  const imageUrl = `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${imageKey}`;

  return {
    imageKey,
    imageUrl,
  };
};

const deleteImageFromS3 = async (imageKey) => {
  if (!imageKey) return;

  await s3.send(
    new DeleteObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: imageKey,
    })
  );
};

module.exports = {
  uploadImageToS3,
  deleteImageFromS3,
};