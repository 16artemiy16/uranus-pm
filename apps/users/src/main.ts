import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../config/rabbit.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(UsersModule, {
    transport: Transport.RMQ,
    options: rabbitConfig.users.options,
  });
  await app.listen(() => console.log('Microservice Users is listening'));
}
bootstrap();
