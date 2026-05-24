import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { PaymentsService } from './payments.service.js';
import { InitiatePaymentDto, MidtransWebhookDto, XenditWebhookDto } from './dto/create-payment.dto.js';
import { GetUser, Public } from '../auth/decorators/index.js';
import { BadRequestResponseDto, MessageResponseDto, NotFoundResponseDto, UnauthorizedResponseDto } from '../common/dto/response.dto.js';
import { InitiatePaymentResponseDto, PaymentDto } from './dto/payment-response.dto.js';

@ApiTags('Payments')
@ApiBearerAuth('access-token')
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('initiate')
  @HttpCode(HttpStatus.CREATED)
  @ApiCreatedResponse({ description: 'Payment initiated. Returns payment gateway URL or token.', type: InitiatePaymentResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid payment data or unsupported provider.', type: BadRequestResponseDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Order not found.', type: NotFoundResponseDto })
  initiate(@GetUser('sub') userId: string, @Body() dto: InitiatePaymentDto) {
    return this.paymentsService.initiate(userId, dto);
  }

  @Get('status/:orderId')
  @ApiOkResponse({ description: 'Returns payment status for the given order.', type: PaymentDto })
  @ApiUnauthorizedResponse({ description: 'Access token is missing or invalid.', type: UnauthorizedResponseDto })
  @ApiNotFoundResponse({ description: 'Payment record not found for that order.', type: NotFoundResponseDto })
  getStatus(@GetUser('sub') userId: string, @Param('orderId') orderId: string) {
    return this.paymentsService.getStatus(userId, orderId);
  }

  @Public()
  @Post('webhook/midtrans')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Midtrans webhook processed successfully.', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid or unverifiable webhook payload.', type: BadRequestResponseDto })
  midtransWebhook(@Body() dto: MidtransWebhookDto) {
    return this.paymentsService.handleMidtransWebhook(dto);
  }

  @Public()
  @Post('webhook/xendit')
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({ description: 'Xendit webhook processed successfully.', type: MessageResponseDto })
  @ApiBadRequestResponse({ description: 'Invalid or unverifiable webhook payload.', type: BadRequestResponseDto })
  xenditWebhook(@Body() dto: XenditWebhookDto) {
    return this.paymentsService.handleXenditWebhook(dto);
  }
}
