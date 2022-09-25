import { Expose } from "class-transformer";
import { Column, Entity, PrimaryColumn, CreateDateColumn } from "typeorm";
import { v4 as uuidV4 } from "uuid";

import { appPort } from "../../../../../shared/infra/http/server";

@Entity("users")
class User {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  password?: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column()
  isAdmin: boolean;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @Expose({ name: "avatar_url" })
  avatar_url(): string {
    switch (process.env.USE_STORAGE) {
      case "local":
        return `http://localhost:${appPort}/avatar/${this.avatar}`;
      case "s3":
        return `https://${process.env.S3_BUCKET}.s3.${process.env.S3_BUCKET_REGION}.amazonaws.com/avatar/${this.avatar}`;
      default:
        return null;
    }
  }

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { User };
