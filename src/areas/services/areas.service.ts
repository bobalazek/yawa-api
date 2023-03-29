import { Injectable } from '@nestjs/common';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { parse } from 'yaml';

interface AreaTemplate {
  key: string;
  name: string;
  subheading: string;
  description: string;
}

@Injectable()
export class AreasService {
  _areaTemplates: AreaTemplate[] = [];

  async getAllTemplates(): Promise<AreaTemplate[]> {
    if (this._areaTemplates.length === 0) {
      const areaTemplatesFileContents = readFileSync(resolve(__dirname, '../../../assets/data/areas.yaml'), 'utf8');
      this._areaTemplates = parse(areaTemplatesFileContents);
    }

    return this._areaTemplates;
  }
}
