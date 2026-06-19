"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var XenditService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.XenditService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const xendit_node_1 = require("xendit-node");
let XenditService = XenditService_1 = class XenditService {
    config;
    logger = new common_1.Logger(XenditService_1.name);
    invoiceClient;
    refundClient;
    constructor(config) {
        this.config = config;
        const xendit = new xendit_node_1.Xendit({
            secretKey: this.config.getOrThrow('XENDIT_SECRET_KEY'),
        });
        this.invoiceClient = xendit.Invoice;
        this.refundClient = xendit.Refund;
    }
    async createInvoice(opts) {
        const frontendUrl = this.config.getOrThrow('FRONTEND_URL');
        const invoiceDuration = opts.expiryDate
            ? Math.max(60, Math.floor((opts.expiryDate.getTime() - Date.now()) / 1000))
            : undefined;
        const successRedirectUrl = `${frontendUrl}/order-success?orderId=${encodeURIComponent(opts.orderId)}`;
        const failureRedirectUrl = `${frontendUrl}/payment?orderId=${encodeURIComponent(opts.orderId)}&status=failed`;
        try {
            const invoice = await this.invoiceClient.createInvoice({
                data: {
                    externalId: opts.externalId,
                    amount: opts.amount,
                    payerEmail: opts.payerEmail,
                    description: opts.description ?? 'MamaBear Order Payment',
                    successRedirectUrl,
                    failureRedirectUrl,
                    ...(invoiceDuration !== undefined && { invoiceDuration }),
                },
            });
            return {
                id: invoice.id,
                externalId: invoice.externalId,
                invoiceUrl: invoice.invoiceUrl,
                status: invoice.status,
                expiredAt: invoice.expiryDate ?? opts.expiryDate,
            };
        }
        catch (error) {
            this.logger.error('Failed to create Xendit invoice', error);
            throw new common_1.InternalServerErrorException('Gagal membuat invoice pembayaran');
        }
    }
    async getInvoice(invoiceId) {
        try {
            const invoice = await this.invoiceClient.getInvoiceById({ invoiceId });
            return {
                id: invoice.id,
                externalId: invoice.externalId,
                status: invoice.status,
                paidAt: null,
                amount: invoice.amount,
                expiredAt: invoice.expiryDate,
            };
        }
        catch (error) {
            if (error?.status === 404)
                throw new common_1.NotFoundException('Invoice Xendit tidak ditemukan');
            this.logger.error('Failed to get Xendit invoice', error);
            throw new common_1.InternalServerErrorException('Gagal mengambil status invoice Xendit');
        }
    }
    async createRefund(opts) {
        try {
            const refund = await this.refundClient.createRefund({
                data: {
                    invoiceId: opts.invoiceId,
                    amount: opts.amount,
                    reason: opts.reason ?? 'REQUESTED_BY_CUSTOMER',
                },
            });
            return {
                id: refund.id,
                status: 'PENDING',
                amount: refund.amount,
                referenceId: refund.referenceId,
                created: refund.created,
            };
        }
        catch (error) {
            this.logger.error('Failed to create Xendit refund', error);
            throw new common_1.InternalServerErrorException('Gagal memproses refund Xendit');
        }
    }
};
exports.XenditService = XenditService;
exports.XenditService = XenditService = XenditService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], XenditService);
//# sourceMappingURL=xendit.service.js.map