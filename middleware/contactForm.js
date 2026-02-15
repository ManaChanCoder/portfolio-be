import nodemailer from "nodemailer";

/**
 * contactForm middleware
 * - Expects JSON body: { name, email, subject, message }
 * - Validates inputs and sends an email using SMTP (credentials left blank)
 * - Use with: router.post('/contact', contactLimiter, contactForm)
 */

export default async function contactForm(req, res) {
  try {
    const { name, email, subject, message } = req.body || {};

    // Basic validation
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "name, email and message are required" });
    }

    // Create SMTP transporter (fill credentials in .env)
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Verify transporter when possible (do not fail if credentials empty)
    try {
      await transporter.verify();
    } catch (err) {
      console.warn(
        "SMTP verify failed (credentials may be empty):",
        err && err.message,
      );
    }

    const mailOptions = {
      from: `${name} <${email}>`,
      to: process.env.SMTP_USER,
      subject: subject || `New contact form message from ${name}`,
      text: `You received a new message from the portfolio contact form:\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject || "-"}\n\nMessage:\n${message}`,
      html: `<p>You received a new message from the portfolio contact form</p>
             <p><strong>Name:</strong> ${name}<br/>
             <strong>Email:</strong> ${email}<br/>
             <strong>Subject:</strong> ${subject || "-"} </p>
             <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
    };

    const info = await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ success: true, messageId: info && info.messageId });
  } catch (err) {
    console.error("contactForm error:", err);
    return res.status(500).json({ error: "Failed to send message" });
  }
}
