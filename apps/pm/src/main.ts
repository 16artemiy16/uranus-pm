import { NestFactory } from '@nestjs/core';
import { PMModule } from './pm.module';
import { Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../config/rabbit.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(PMModule, {
    transport: Transport.RMQ,
    options: rabbitConfig.pm.options,
  });
  await app.listen(() => {
    console.log('Microservice PM is listening');
  });
}
bootstrap();
