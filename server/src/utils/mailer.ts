import nodemailer from "nodemailer";
import { env } from "../config/env.js";

const transporter =
  env.smtpUser && env.smtpPass
    ? nodemailer.createTransport({
        service: "gmail",
        auth: { user: env.smtpUser, pass: env.smtpPass },
      })
    : null;

export async function sendUsernameEmail(to: string, displayName: string, username: string): Promise<void> {
  if (!transporter) {
    console.warn("[mailer] SMTP_USER/SMTP_PASS not set — skipping username email.");
    return;
  }

  try {
    await transporter.sendMail({
      from: `"Porikkalam 2026" <${env.smtpUser}>`,
      to,
      subject: "Your Porikkalam 2026 Participant Username",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #b8860b;">Welcome to Porikkalam 2026, ${displayName}!</h2>
          <p>Your participant profile has been created successfully. Use the username below along with your password to sign in and register for events.</p>
          <div style="background: #f5efe0; border: 1px solid #d4af37; border-radius: 8px; padding: 16px; text-align: center; margin: 20px 0;">
            <p style="margin: 0; font-size: 12px; text-transform: uppercase; letter-spacing: 0.1em; color: #8a6d1f;">Your Username</p>
            <p style="margin: 8px 0 0; font-size: 24px; font-weight: 800; letter-spacing: 0.05em; color: #1a1a1a;">${username}</p>
          </div>
          <p>Please save this username — you'll need it to sign in and register for events.</p>
          <p>Porikkalam 2026 · Government College of Technology, Coimbatore</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[mailer] failed to send username email:", error);
  }
}

export async function sendResetEmail(to: string, displayName: string, token: string): Promise<void> {
  if (!transporter) {
    console.warn("[mailer] SMTP_USER/SMTP_PASS not set — skipping password reset email.");
    return;
  }

  const resetUrl = `${env.clientUrl}/reset-password?token=${token}`;

  try {
    await transporter.sendMail({
      from: `"Porikkalam 2026" <${env.smtpUser}>`,
      to,
      subject: "Reset your Porikkalam 2026 password",
      html: `
        <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto; color: #1a1a1a;">
          <h2 style="color: #b8860b;">Password reset requested</h2>
          <p>Hi ${displayName}, we received a request to reset your Porikkalam 2026 password. This link expires in 1 hour.</p>
          <p style="margin: 20px 0;">
            <a href="${resetUrl}" style="background: #d4af37; color: #1a1a1a; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 700;">Reset Password</a>
          </p>
          <p style="font-size: 12px; color: #666;">If you didn't request this, you can safely ignore this email.</p>
          <p>Porikkalam 2026 · Government College of Technology, Coimbatore</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("[mailer] failed to send reset email:", error);
  }
}
