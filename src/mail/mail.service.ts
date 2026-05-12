import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor(private config: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: config.getOrThrow('SMTP_HOST'),
      port: config.get<number>('SMTP_PORT', 587),
      secure: false,
      auth: {
        user: config.getOrThrow('SMTP_USER'),
        pass: config.getOrThrow('SMTP_PASS'),
      },
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    const url = `${this.config.getOrThrow('APP_URL')}/api/auth/verify-email?token=${token}`;

    await this.transporter.sendMail({
      from: `"${this.config.get('SMTP_FROM_NAME', 'App')}" <${this.config.get('SMTP_USER')}>`,
      to: email,
      subject: 'Verifikasi Email Kamu',
      html: `
        <h2>Verifikasi Email</h2>
        <p>Klik link di bawah untuk memverifikasi email kamu:</p>
        <a href="${url}" style="
          display:inline-block;
          padding:12px 24px;
          background:#4f46e5;
          color:white;
          text-decoration:none;
          border-radius:6px;
        ">Verifikasi Email</a>
        <p>Link berlaku selama <strong>24 jam</strong>.</p>
        <p>Jika kamu tidak mendaftar, abaikan email ini.</p>
      `,
    });
  }

  async sendResetPasswordEmail(email: string, name: string, token: string) {
    const url = `${this.config.getOrThrow('FRONTEND_URL')}/reset-password?token=${token}`;

    await this.transporter.sendMail({
      from: `"${this.config.get('SMTP_FROM_NAME', 'App')}" <${this.config.get('SMTP_USER')}>`,
      to: email,
      subject: 'Reset Password',
      html: `
        <h2>Halo, ${name}!</h2>
        <p>Kami menerima permintaan reset password untuk akunmu.</p>
        <a href="${url}" style="
          display:inline-block;
          padding:12px 24px;
          background:#4f46e5;
          color:white;
          text-decoration:none;
          border-radius:6px;
        ">Reset Password</a>
        <p>Link berlaku selama <strong>1 jam</strong>.</p>
        <p>Jika kamu tidak meminta reset password, abaikan email ini.</p>
      `,
    });
  }
}