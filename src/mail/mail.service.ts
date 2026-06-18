import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
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

  // ─── Helpers ───────────────────────────────────────────────────────────────

  private get fromAddress() {
    const name = this.config.get('SMTP_FROM_NAME', 'MamaBear');
    const user = this.config.get('SMTP_USER');
    return `"${name}" <${user}>`;
  }

  private baseTemplate(content: string): string {
    return `
<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MamaBear</title>
</head>
<body style="margin:0;padding:0;background-color:#f9f5f2;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f9f5f2;padding:32px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.06);">
          <tr>
            <td style="background-color:#b5533c;padding:28px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:1px;">🐻 MamaBear</h1>
              <p style="margin:4px 0 0;color:#f5d5cb;font-size:13px;">Teman Terpercaya Ibu Menyusui</p>
            </td>
          </tr>
          <tr>
            <td style="padding:36px 40px;">${content}</td>
          </tr>
          <tr>
            <td style="background-color:#fdf6f3;padding:24px 40px;text-align:center;border-top:1px solid #f0e0d8;">
              <p style="margin:0;color:#999;font-size:12px;">© ${new Date().getFullYear()} MamaBear. All rights reserved.</p>
              <p style="margin:6px 0 0;color:#bbb;font-size:11px;">Email ini dikirim otomatis, mohon tidak membalas email ini.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
  }

  private button(href: string, label: string): string {
    return `
      <div style="text-align:center;margin:28px 0;">
        <a href="${href}" style="display:inline-block;padding:14px 32px;background-color:#b5533c;color:#ffffff;text-decoration:none;border-radius:8px;font-size:15px;font-weight:600;letter-spacing:0.3px;">${label}</a>
      </div>`;
  }

  private async send(to: string, subject: string, html: string) {
    try {
      await this.transporter.sendMail({ from: this.fromAddress, to, subject, html });
      this.logger.log(`Email sent to ${to}: ${subject}`);
    } catch (error) {
      this.logger.error(`Failed to send email to ${to}: ${subject}`, error);
    }
  }

  // ─── Email Verifikasi ─────────────────────────────────────────────────────

  async sendVerificationEmail(email: string, token: string) {
    const url = `${this.config.getOrThrow('APP_URL')}/api/auth/verify-email?token=${token}`;
    const content = `
      <h2 style="margin:0 0 12px;color:#2d2d2d;font-size:22px;">Verifikasi Email Kamu 📩</h2>
      <p style="color:#555;line-height:1.7;margin:0 0 8px;">Halo! Terima kasih sudah mendaftar di MamaBear.</p>
      <p style="color:#555;line-height:1.7;margin:0 0 20px;">Klik tombol di bawah untuk memverifikasi email kamu dan mulai berbelanja:</p>
      ${this.button(url, 'Verifikasi Email Saya')}
      <p style="color:#999;font-size:13px;text-align:center;margin:0;">Link berlaku selama <strong>24 jam</strong>. Jika kamu tidak mendaftar, abaikan email ini.</p>`;
    await this.send(email, '✅ Verifikasi Email MamaBear', this.baseTemplate(content));
  }

  // ─── Reset Password ───────────────────────────────────────────────────────

  async sendResetPasswordEmail(email: string, name: string, token: string) {
    const url = `${this.config.getOrThrow('FRONTEND_URL')}/reset-password?token=${token}`;
    const content = `
      <h2 style="margin:0 0 12px;color:#2d2d2d;font-size:22px;">Reset Password 🔐</h2>
      <p style="color:#555;line-height:1.7;margin:0 0 8px;">Halo, <strong>${name}</strong>!</p>
      <p style="color:#555;line-height:1.7;margin:0 0 20px;">Kami menerima permintaan reset password untuk akunmu. Klik tombol di bawah untuk membuat password baru:</p>
      ${this.button(url, 'Reset Password Saya')}
      <p style="color:#999;font-size:13px;text-align:center;margin:0;">Link berlaku selama <strong>1 jam</strong>. Jika kamu tidak meminta reset password, abaikan email ini.</p>`;
    await this.send(email, '🔐 Reset Password MamaBear', this.baseTemplate(content));
  }

  // ─── Order Confirmation ───────────────────────────────────────────────────

  async sendOrderConfirmation(opts: {
    email: string;
    name: string;
    orderNumber: string;
    items: Array<{ productName: string; variantName?: string | null; quantity: number; price: number }>;
    subtotal: number;
    shippingCost: number;
    total: number;
    courier: string;
    service: string;
    paymentUrl?: string | null;
  }) {
    const frontendUrl = this.config.getOrThrow('FRONTEND_URL');
    const orderUrl = `${frontendUrl}/account/orders`;

    const itemRows = opts.items.map((item) => `
      <tr>
        <td style="padding:10px 0;border-bottom:1px solid #f0e0d8;color:#333;font-size:14px;">
          ${item.productName}${item.variantName ? ` <span style="color:#888;font-size:12px;">(${item.variantName})</span>` : ''}
        </td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e0d8;color:#555;font-size:14px;text-align:center;">x${item.quantity}</td>
        <td style="padding:10px 0;border-bottom:1px solid #f0e0d8;color:#333;font-size:14px;text-align:right;">
          Rp ${item.price.toLocaleString('id-ID')}
        </td>
      </tr>`).join('');

    const paymentSection = opts.paymentUrl ? `
      <div style="background:#fff8f5;border:1px solid #f0d0c0;border-radius:8px;padding:16px 20px;margin:24px 0;">
        <p style="margin:0 0 8px;color:#b5533c;font-weight:600;font-size:14px;">⏳ Selesaikan Pembayaran dalam 2 Jam</p>
        <p style="margin:0 0 12px;color:#555;font-size:13px;">Pesanan kamu menunggu pembayaran. Klik tombol di bawah untuk melanjutkan:</p>
        <div style="text-align:center;">
          <a href="${opts.paymentUrl}" style="display:inline-block;padding:12px 28px;background-color:#b5533c;color:#ffffff;text-decoration:none;border-radius:8px;font-size:14px;font-weight:600;">Bayar Sekarang</a>
        </div>
      </div>` : '';

    const content = `
      <h2 style="margin:0 0 6px;color:#2d2d2d;font-size:22px;">Pesanan Diterima! 🎉</h2>
      <p style="color:#555;line-height:1.7;margin:0 0 20px;">Halo, <strong>${opts.name}</strong>! Pesanan kamu sudah kami terima.</p>
      <div style="background:#fdf6f3;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
        <p style="margin:0;color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Nomor Pesanan</p>
        <p style="margin:4px 0 0;color:#b5533c;font-size:20px;font-weight:700;">${opts.orderNumber}</p>
      </div>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:8px;">
        <tbody>${itemRows}</tbody>
      </table>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin-top:16px;">
        <tr>
          <td style="color:#555;font-size:14px;padding:6px 0;">Subtotal</td>
          <td style="color:#333;font-size:14px;text-align:right;padding:6px 0;">Rp ${opts.subtotal.toLocaleString('id-ID')}</td>
        </tr>
        <tr>
          <td style="color:#555;font-size:14px;padding:6px 0;">Ongkos Kirim (${opts.courier} ${opts.service})</td>
          <td style="color:#333;font-size:14px;text-align:right;padding:6px 0;">Rp ${opts.shippingCost.toLocaleString('id-ID')}</td>
        </tr>
        <tr>
          <td style="color:#2d2d2d;font-size:16px;font-weight:700;padding:12px 0 0;border-top:2px solid #f0e0d8;">Total</td>
          <td style="color:#b5533c;font-size:16px;font-weight:700;text-align:right;padding:12px 0 0;border-top:2px solid #f0e0d8;">Rp ${opts.total.toLocaleString('id-ID')}</td>
        </tr>
      </table>
      ${paymentSection}
      ${this.button(orderUrl, 'Lihat Detail Pesanan')}`;

    await this.send(opts.email, `🎉 Pesanan ${opts.orderNumber} Diterima - MamaBear`, this.baseTemplate(content));
  }

  // ─── Shipping Notification ────────────────────────────────────────────────

  async sendShippingNotification(opts: {
    email: string;
    name: string;
    orderNumber: string;
    trackingNumber: string;
    courier: string;
    service: string;
  }) {
    const frontendUrl = this.config.getOrThrow('FRONTEND_URL');
    const orderUrl = `${frontendUrl}/account/orders`;

    const content = `
      <h2 style="margin:0 0 12px;color:#2d2d2d;font-size:22px;">Pesanan Kamu Sedang Dikirim! 🚚</h2>
      <p style="color:#555;line-height:1.7;margin:0 0 20px;">Halo, <strong>${opts.name}</strong>! Kabar baik — pesanan kamu sudah dalam perjalanan.</p>
      <div style="background:#fdf6f3;border-radius:8px;padding:20px;margin-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="color:#888;font-size:12px;text-transform:uppercase;padding-bottom:4px;">Nomor Pesanan</td></tr>
          <tr><td style="color:#b5533c;font-size:18px;font-weight:700;padding-bottom:16px;">${opts.orderNumber}</td></tr>
          <tr><td style="color:#888;font-size:12px;text-transform:uppercase;padding-bottom:4px;">Kurir</td></tr>
          <tr><td style="color:#333;font-size:15px;font-weight:600;padding-bottom:16px;">${opts.courier} ${opts.service}</td></tr>
          <tr><td style="color:#888;font-size:12px;text-transform:uppercase;padding-bottom:4px;">Nomor Resi</td></tr>
          <tr><td style="color:#333;font-size:18px;font-weight:700;letter-spacing:1px;">${opts.trackingNumber}</td></tr>
        </table>
      </div>
      <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 20px;">
        Gunakan nomor resi di atas untuk melacak paketmu melalui website <strong>${opts.courier}</strong>.
      </p>
      ${this.button(orderUrl, 'Lihat Detail Pesanan')}`;

    await this.send(opts.email, `🚚 Pesanan ${opts.orderNumber} Sedang Dikirim - MamaBear`, this.baseTemplate(content));
  }

  // ─── Refund Notification ─────────────────────────────────────────────────
  // BARU

  async sendRefundNotification(opts: {
    email: string;
    name: string;
    orderNumber: string;
    amount: number;
  }) {
    const frontendUrl = this.config.getOrThrow('FRONTEND_URL');
    const csUrl = `${frontendUrl}/contact`;

    const content = `
      <h2 style="margin:0 0 12px;color:#2d2d2d;font-size:22px;">Dana Dikembalikan 💸</h2>
      <p style="color:#555;line-height:1.7;margin:0 0 20px;">Halo, <strong>${opts.name}</strong>!</p>
      <p style="color:#555;line-height:1.7;margin:0 0 20px;">
        Kami ingin memberitahu bahwa refund untuk pesanan kamu sedang diproses.
      </p>
      <div style="background:#fdf6f3;border-radius:8px;padding:20px;margin-bottom:24px;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr><td style="color:#888;font-size:12px;text-transform:uppercase;padding-bottom:4px;">Nomor Pesanan</td></tr>
          <tr><td style="color:#b5533c;font-size:18px;font-weight:700;padding-bottom:16px;">${opts.orderNumber}</td></tr>
          <tr><td style="color:#888;font-size:12px;text-transform:uppercase;padding-bottom:4px;">Jumlah Refund</td></tr>
          <tr><td style="color:#333;font-size:18px;font-weight:700;">Rp ${opts.amount.toLocaleString('id-ID')}</td></tr>
        </table>
      </div>
      <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 8px;">
        Dana akan dikembalikan ke metode pembayaran asal dalam <strong>3–7 hari kerja</strong>, tergantung kebijakan bank atau platform pembayaran kamu.
      </p>
      <p style="color:#555;font-size:14px;line-height:1.7;margin:0 0 20px;">
        Jika ada pertanyaan atau dana belum diterima setelah 7 hari kerja, jangan ragu menghubungi kami:
      </p>
      ${this.button(csUrl, 'Hubungi Customer Service')}`;

    await this.send(
      opts.email,
      `💸 Refund Pesanan ${opts.orderNumber} Sedang Diproses - MamaBear`,
      this.baseTemplate(content),
    );
  }
}