import { transporter } from "./nodemailer.setup.js";
import "dotenv/config";
import { contactFormTemplate } from "./email.template.js";
// import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async (name, email, subject, message) => {
  try {
    const res = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: email,
      subject: subject,
      html: contactFormTemplate(name, email, subject, message),
      category: "Contact Form",
    });
    console.log("Email sent successfully: ", res);
  } catch (error) {
    console.error(`Error sending email: ${error}`);
    throw new Error("Failed to send email", error.message);
  }
};

// export const sendEmail = async (name, email, subject, message) => {
//   try {
//     const msg = {
//       to: email, // recipient
//       from: process.env.SMTP_USER, // verified sender
//       subject: subject,
//       html: contactFormTemplate(name, email, subject, message),
//       category: "Contact Form",
//     };

//     const response = await sgMail.send(msg);
//     console.log("Email sent via SendGrid:", response);
//   } catch (error) {
//     console.error(
//       "SendGrid error:",
//       error.response ? error.response.body : error,
//     );
//     throw new Error(`Failed to send email: ${error.message}`);
//   }
// };
