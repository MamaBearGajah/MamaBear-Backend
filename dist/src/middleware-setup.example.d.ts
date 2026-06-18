import { NestModule, MiddlewareConsumer } from '@nestjs/common';
export declare class MiddlewareExampleModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void;
}
