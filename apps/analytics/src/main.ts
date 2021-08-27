import { NestFactory } from '@nestjs/core';
import { AnalyticsModule } from './analytics.module';
import { Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../config/rabbit.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AnalyticsModule, {
    transport: Transport.RMQ,
    options: rabbitConfig.analytics.options,
  });
  await app.listen(() => {
    console.log('Microservice Analytics is listening');
  });
}
bootstrap();
