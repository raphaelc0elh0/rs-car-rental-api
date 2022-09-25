import aws, { SES } from "aws-sdk";
import fs from "fs";
import handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

const ses = new SES({
  apiVersion: "2010-12-01",
  region: process.env.SES_REGION,
});

class SesMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    const transporter = nodemailer.createTransport({
      SES: { ses, aws },
    });
    this.client = transporter;
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    const templateFileContent = fs.readFileSync(path).toString("utf-8");
    const templateParse = handlebars.compile(templateFileContent);
    const templateHTML = templateParse(variables);

    await this.client.sendMail({
      from: "Rentx Test <raphael@hostel4pets.com.br>",
      to,
      subject,
      html: templateHTML,
    });
  }
}

export { SesMailProvider };
