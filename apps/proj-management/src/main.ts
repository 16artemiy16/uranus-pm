import { NestFactory } from '@nestjs/core';
import { ProjManagementModule } from './proj-management.module';
import { Transport } from '@nestjs/microservices';
import rabbitConfig from '../../../config/rabbit.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(ProjManagementModule, {
    transport: Transport.RMQ,
    options: rabbitConfig.users.options,
  });
  await app.listen(() => {
    console.log('Microservice ProjManagement is listening');
  });
}
bootstrap();
