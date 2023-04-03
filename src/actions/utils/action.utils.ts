import { ActionDto } from '../dtos/action.dto';
import {
  Action,
  GOAL_INTERVAL_UNITS,
  GOAL_TYPES,
  REMINDER_INTERVAL_TYPES,
  REMINDER_RECURRENCE_INTERVAL_UNITS,
} from '../entities/action.entity';

export const validateAction = (dto: ActionDto): true | { errors: string[] } => {
  const errors: string[] = [];

  if (dto.goalType && !GOAL_TYPES.includes(dto.goalType)) {
    errors.push('goalType must be either "binary" or "measurable"');
  }

  if (dto.goalType && dto.goalAmount && dto.goalAmount <= 0) {
    errors.push('goalAmount must be greater than 0');
  }

  if (dto.goalType && dto.goalAmount && dto.goalAmount >= 1000) {
    errors.push('goalAmount must be less than 1000');
  }

  if (dto.goalType && dto.goalUnit && dto.goalUnit.length > 24) {
    errors.push('goalUnit must be less than 24 characters');
  }

  if (dto.goalIntervalUnit && !GOAL_INTERVAL_UNITS.includes(dto.goalIntervalUnit)) {
    errors.push('goalIntervalUnit must be either "day", "week", "month" or "year"');
  }

  if (dto.reminderIntervalType && !REMINDER_INTERVAL_TYPES.includes(dto.reminderIntervalType)) {
    errors.push('reminderIntervalType must be either "only_once", "recurring_every_x_y" or "recurring_x_times_per_y"');
  }

  if (
    dto.reminderRecurrenceIntervalUnit &&
    !REMINDER_RECURRENCE_INTERVAL_UNITS.includes(dto.reminderRecurrenceIntervalUnit)
  ) {
    errors.push('reminderRecurrenceIntervalUnit must be either "minute", "hour", "day", "week", "month" or "year"');
  }

  if (errors.length) {
    return { errors };
  }

  return true;
};

export const getNextActionExecutionDate = (action: Action, currentDate: Date = new Date()): Date | null => {
  return null;
};
