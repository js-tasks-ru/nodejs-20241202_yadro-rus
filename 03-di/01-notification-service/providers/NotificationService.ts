import { createTransport, Transporter } from "nodemailer" ;
import { Injectable } from "@nestjs/common";
import SMTPTransport from "nodemailer/lib/smtp-transport";

/*
* Синглтон обеспечен благодаря импортам модулей и экспортом ресурсов внутри модуля.
  Если прокидывать сервис напрямую в разные модули, то будут создаваться свои экземпляры в рамках модуля.
* Injectable тут не имеет значения ?
* */
@Injectable()
export class NotificationService {

  private transporter: Transporter<SMTPTransport.SentMessageInfo, SMTPTransport.Options>;

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

  sendEmail(to: string, subject: string, content: string) {
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
        console.error(e); // can be added to logger
        resolve(false);
      });
    });
  }

  // NOTE: https://www.courier.com/guides/nodejs-send-sms
  sendSMS(to: string, text: string) {
    return new Promise((resolve, reject) => {
      console.log(`SMS: ${text}, отправленна на номер: ${to}`);
      setTimeout(resolve, 2000);
    });
  }
}
