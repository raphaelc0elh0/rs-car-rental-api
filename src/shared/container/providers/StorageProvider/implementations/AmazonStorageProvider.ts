import { S3 } from "aws-sdk";
import fs from "fs";
import mime from "mime";
import path from "path";

import { uploadConfig } from "../../../../../config/uploadConfig";
import { IStorageProvider } from "../IStorageProvider";

class AmazonStorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      region: process.env.S3_BUCKET_REGION,
    });
  }

  async save(file: string, folder: string): Promise<string> {
    const originalName = path.resolve(uploadConfig.tmpFolder, file);
    const fileContent = await fs.promises.readFile(originalName);
    const contentType = mime.getType(originalName);

    await this.client
      .putObject({
        Bucket: `${process.env.S3_BUCKET}/${folder}`,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType: contentType,
      })
      .promise();

    await fs.promises.unlink(originalName);
    return file;
  }
  async delete(file: string): Promise<string> {
    await this.client.deleteObject({
      Bucket: `${process.env.S3_BUCKET}/avatar`,
      Key: file,
    }).promise;

    return file;
  }
}

export { AmazonStorageProvider };
