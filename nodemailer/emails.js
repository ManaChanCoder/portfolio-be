import { transporter } from "./nodemailer.setup.js";
import "dotenv/config";
import { contactFormTemplate } from "./email.template.js";
export const sendEmail = async (name, email, subject, message) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: contactFormTemplate(name, email, subject, message),
      category: "Contact Form",
    });
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    throw new Error("Failed to send email", error);
  }
};
