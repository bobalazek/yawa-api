import { isValidTimeShort } from '../../common/utils/time.utils';
import { ActionDto } from '../dtos/action.dto';
import { CreateActionDto } from '../dtos/create-action.dto';
import { UpdateActionDto } from '../dtos/update-action.dto';
import {
  Action,
  GOAL_INTERVAL_UNITS,
  GOAL_TYPES,
  REMINDER_INTERVAL_TYPES,
  REMINDER_RECURRENCE_INTERVAL_UNITS,
  REMINDER_RECURRENCE_VARIANCE_UNITS,
} from '../entities/action.entity';

interface ValidateActionError {
  field: keyof ActionDto;
  message: string;
}

export const validateAction = (dto: CreateActionDto | UpdateActionDto): true | { errors: ValidateActionError[] } => {
  const errors: ValidateActionError[] = [];

  /* ========== Goal ========== */
  if (!GOAL_TYPES.includes(dto.goalType)) {
    errors.push({ field: 'goalType', message: `goalType must be either: ${GOAL_TYPES.join(', ')}` });
  }

  if (typeof dto.goalAmount !== 'undefined' && dto.goalAmount !== null) {
    if (dto.goalAmount <= 0) {
      errors.push({ field: 'goalAmount', message: `goalAmount must be greater than 0` });
    } else if (dto.goalAmount >= 1000) {
      errors.push({ field: 'goalAmount', message: `goalAmount must be less than 1000` });
    }
  }

  if (dto.goalUnit && dto.goalUnit.length > 24) {
    errors.push({ field: 'goalUnit', message: `goalUnit must be less than 24 characters` });
  }

  if (!GOAL_INTERVAL_UNITS.includes(dto.goalIntervalUnit)) {
    errors.push({
      field: 'goalIntervalUnit',
      message: `goalIntervalUnit must be either: ${GOAL_INTERVAL_UNITS.join(', ')}`,
    });
  }

  /* ========== Reminder ========== */
  if (dto.reminderIntervalType && !REMINDER_INTERVAL_TYPES.includes(dto.reminderIntervalType)) {
    errors.push({
      field: 'reminderIntervalType',
      message: `reminderIntervalType must be either: ${REMINDER_INTERVAL_TYPES.join(', ')}`,
    });
  }

  if (dto.reminderIntervalType === 'only_once') {
    if (!dto.reminderStartDate) {
      errors.push({
        field: 'reminderStartDate',
        message: `reminderStartDate is required when reminderIntervalType is "only_once"`,
      });
    }

    if (!dto.reminderStartTime) {
      errors.push({
        field: 'reminderStartTime',
        message: `reminderStartTime is required when reminderIntervalType is "only_once"`,
      });
    }
  } else {
    if (!dto.reminderRecurrenceIntervalAmount) {
      errors.push({
        field: 'reminderRecurrenceIntervalAmount',
        message: `reminderRecurrenceIntervalAmount is required`,
      });
    }

    if (!dto.reminderRecurrenceIntervalUnit) {
      errors.push({ field: 'reminderRecurrenceIntervalUnit', message: `reminderRecurrenceIntervalUnit is required` });
    }
  }

  if (dto.reminderStartTime && !isValidTimeShort(dto.reminderStartTime)) {
    errors.push({ field: 'reminderStartTime', message: `reminderStartTime is not a valid time` });
  }

  if (dto.reminderEndTime && !isValidTimeShort(dto.reminderEndTime)) {
    errors.push({ field: 'reminderEndTime', message: `reminderEndTime is not a valid time` });
  }

  if (!dto.reminderStartDate && dto.reminderStartTime) {
    errors.push({ field: 'reminderStartDate', message: `reminderStartDate is required when reminderStartTime is set` });
  }

  if (!dto.reminderEndDate && dto.reminderEndTime) {
    errors.push({ field: 'reminderEndDate', message: `reminderEndDate is required when reminderEndTime is set` });
  }

  if (dto.reminderStartDate && dto.reminderEndDate) {
    const startDateString = dto.reminderStartTime
      ? `${dto.reminderStartDate}T${dto.reminderStartTime}:00`
      : dto.reminderStartDate;
    const endDateString = dto.reminderEndTime
      ? `${dto.reminderEndDate}T${dto.reminderEndTime}:00`
      : dto.reminderEndDate;

    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    if (startDate > endDate) {
      errors.push({ field: 'reminderEndTime', message: `reminderEndTime must be after reminderStartDate` });
    }
  }

  if (dto.reminderRecurrenceIntervalUnit) {
    if (!REMINDER_RECURRENCE_INTERVAL_UNITS.includes(dto.reminderRecurrenceIntervalUnit)) {
      errors.push({
        field: 'reminderRecurrenceIntervalUnit',
        message: `reminderRecurrenceIntervalUnit must be either: ${REMINDER_RECURRENCE_INTERVAL_UNITS.join(', ')}`,
      });
    }

    if (!dto.reminderRecurrenceIntervalAmount) {
      errors.push({
        field: 'reminderRecurrenceIntervalAmount',
        message: `reminderRecurrenceIntervalAmount is required when reminderRecurrenceIntervalUnit is set`,
      });
    }
  }

  if (dto.reminderRecurrenceIntervalAmount && !dto.reminderRecurrenceIntervalUnit) {
    errors.push({
      field: 'reminderRecurrenceIntervalUnit',
      message: `reminderRecurrenceIntervalUnit is required when reminderRecurrenceIntervalAmount is set`,
    });
  }

  if (dto.reminderRecurrenceVarianceUnit) {
    if (!REMINDER_RECURRENCE_VARIANCE_UNITS.includes(dto.reminderRecurrenceVarianceUnit)) {
      errors.push({
        field: 'reminderRecurrenceVarianceUnit',
        message: `reminderRecurrenceVarianceUnit must be either: ${REMINDER_RECURRENCE_VARIANCE_UNITS.join(', ')}`,
      });
    }

    if (!dto.reminderRecurrenceVarianceAmount) {
      errors.push({
        field: 'reminderRecurrenceVarianceAmount',
        message: `reminderRecurrenceVarianceAmount is required when reminderRecurrenceVarianceUnit is set`,
      });
    }
  }

  if (dto.reminderRecurrenceVarianceAmount && !dto.reminderRecurrenceVarianceUnit) {
    errors.push({
      field: 'reminderRecurrenceVarianceUnit',
      message: `reminderRecurrenceVarianceUnit is required when reminderRecurrenceVarianceAmount is set`,
    });
  }

  if (errors.length) {
    return { errors };
  }

  return true;
};

export const getNextActionExecutionDate = (action: Action, currentDate: Date = new Date()): Date | null => {
  return null;
};
