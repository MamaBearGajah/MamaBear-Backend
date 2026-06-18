export declare class CreatePaymentDto {
    orderId: string;
    provider: 'xendit' | 'midtrans';
    amount: number;
}
