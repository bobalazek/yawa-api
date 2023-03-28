import { Injectable } from '@nestjs/common';

import { AreaTemplateDto } from '../dtos/area-template.dto';

@Injectable()
export class AreasService {
  async getAllTemplates(): Promise<AreaTemplateDto[]> {
    return [];
  }
}
