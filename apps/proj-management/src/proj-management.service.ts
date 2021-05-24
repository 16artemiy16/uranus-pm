import { Injectable } from '@nestjs/common';

@Injectable()
export class ProjManagementService {
  getHello(): string {
    return 'Hello World!';
  }
}
