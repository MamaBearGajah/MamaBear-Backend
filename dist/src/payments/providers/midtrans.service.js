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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var MidtransService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MidtransService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const midtrans_client_1 = __importDefault(require("midtrans-client"));
let MidtransService = MidtransService_1 = class MidtransService {
    config;
    logger = new common_1.Logger(MidtransService_1.name);
    snap;
    core;
    constructor(config) {
        this.config = config;
        const isProduction = this.config.get('MIDTRANS_IS_PRODUCTION') === 'true';
        const serverKey = this.config.getOrThrow('MIDTRANS_SERVER_KEY');
        const clientKey = this.config.getOrThrow('MIDTRANS_CLIENT_KEY');
        this.snap = new midtrans_client_1.default.Snap({ isProduction, serverKey, clientKey });
        this.core = new midtrans_client_1.default.CoreApi({ isProduction, serverKey, clientKey });
    }
    async createSnapToken(opts) {
        try {
            const transaction = await this.snap.createTransaction({
                transaction_details: {
                    order_id: opts.orderId,
                    gross_amount: opts.amount,
                },
                customer_details: {
                    first_name: opts.customerName,
                    email: opts.customerEmail,
                },
                item_details: opts.description
                    ? [{ id: opts.orderId, price: opts.amount, quantity: 1, name: opts.description }]
                    : undefined,
            });
            return {
                token: transaction.token,
                redirectUrl: transaction.redirect_url,
            };
        }
        catch (error) {
            this.logger.error('Failed to create Midtrans Snap token', error);
            throw new common_1.InternalServerErrorException('Gagal membuat token pembayaran Midtrans');
        }
    }
    async getTransactionStatus(orderId) {
        try {
            const status = await this.core.transaction.status(orderId);
            return {
                orderId: status.order_id,
                transactionStatus: status.transaction_status,
                fraudStatus: status.fraud_status,
                grossAmount: status.gross_amount,
                paymentType: status.payment_type,
                transactionTime: status.transaction_time,
            };
        }
        catch (error) {
            this.logger.error(`Failed to get Midtrans transaction status for ${orderId}`, error);
            throw new common_1.InternalServerErrorException('Gagal mengambil status transaksi Midtrans');
        }
    }
    async createRefund(opts) {
        try {
            const result = await this.core.transaction.refund(opts.orderId, {
                refund_key: `refund-${opts.orderId}-${Date.now()}`,
                amount: opts.amount,
                reason: opts.reason ?? 'Customer requested refund',
            });
            return {
                orderId: result.order_id,
                refundAmount: result.refund_amount,
                status: result.transaction_status,
            };
        }
        catch (error) {
            this.logger.error(`Failed to create Midtrans refund for ${opts.orderId}`, error);
            throw new common_1.InternalServerErrorException('Gagal memproses refund Midtrans');
        }
    }
};
exports.MidtransService = MidtransService;
exports.MidtransService = MidtransService = MidtransService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], MidtransService);
//# sourceMappingURL=midtrans.service.js.map