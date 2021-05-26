import { Controller } from '@nestjs/common';
import { PmService } from '../services/pm.service';

@Controller()
export class PmController {
  constructor(
    private readonly pmService: PmService
  ) {}
}
