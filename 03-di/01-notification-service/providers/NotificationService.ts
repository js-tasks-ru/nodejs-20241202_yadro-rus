import { createTransport } from "nodemailer" ;
import { Injectable } from "@nestjs/common";

import { IsEmail } from "class-validator";

/*export class CreateUserDto {
  @IsEmail()
  email: string;
}*/

@Injectable()
export class NotificationService {

  private transporter: any;

  constructor() {
    this.transporter = createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for port 465, false for other ports
      auth: {
        user: "maddison53@ethereal.email",
        pass: "jn7jnAPss4f63QBp6D"
      }
    });
  }

  async sendEmail(to: string, subject: string, content: string) {
    return new Promise((resolve, reject) => {
      this.transporter.sendMail({
        from: "Super User",
        to,
        subject,
        text: content,
        html: content
      }).then(() => {
        resolve(true);
      }).catch((e) => {
        console.error(e);
        resolve(false);
      });
    });
  }

  async sendSMS(to: string, text: string) {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 2000);
    });
  }
}
