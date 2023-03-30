import { OmitType } from '@nestjs/swagger';

import { ActionDto } from './action.dto';

export class CreateActionDto extends OmitType(ActionDto, ['id', 'createdAt', 'updatedAt'] as const) {}
