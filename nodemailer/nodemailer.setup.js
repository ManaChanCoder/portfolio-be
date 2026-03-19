import "dotenv/config";
import nodemailer from "nodemailer";

const isProduction = process.env.NODE_ENV === "production";

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 10000,
});
console.log(
  `Email is running in: ${isProduction ? "PRODUCTION" : "DEVELOPMENT"}`,
);
