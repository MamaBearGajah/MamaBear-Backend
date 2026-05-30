export class CreatePaymentDto {
  provider: 'xendit' | 'midtrans';
  amount: number;
}
