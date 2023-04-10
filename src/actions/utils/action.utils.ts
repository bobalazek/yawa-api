import { DateTime, Duration, DurationLikeObject } from 'luxon';

import { ActionDto } from '../dtos/action.dto';
import { CreateActionDto } from '../dtos/create-action.dto';
import { UpdateActionDto } from '../dtos/update-action.dto';
import {
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
    errors.push({
      field: 'goalType',
      message: `goalType must be either: ${GOAL_TYPES.join(', ')}`,
    });
  }

  if (typeof dto.goalAmount !== 'undefined' && dto.goalAmount !== null) {
    if (dto.goalAmount <= 0) {
      errors.push({
        field: 'goalAmount',
        message: `goalAmount must be greater than 0`,
      });
    } else if (dto.goalAmount >= 1000) {
      errors.push({
        field: 'goalAmount',
        message: `goalAmount must be less than 1000`,
      });
    }
  }

  if (dto.goalUnit && dto.goalUnit.length > 24) {
    errors.push({
      field: 'goalUnit',
      message: `goalUnit must be less than 24 characters`,
    });
  }

  if (!GOAL_INTERVAL_UNITS.includes(dto.goalIntervalUnit)) {
    errors.push({
      field: 'goalIntervalUnit',
      message: `goalIntervalUnit must be either: ${GOAL_INTERVAL_UNITS.join(', ')}`,
    });
  }

  /* ========== Reminder ========== */
  if (dto.reminderEnabled) {
    if (dto.reminderIntervalType && !REMINDER_INTERVAL_TYPES.includes(dto.reminderIntervalType)) {
      errors.push({
        field: 'reminderIntervalType',
        message: `reminderIntervalType must be either: ${REMINDER_INTERVAL_TYPES.join(', ')}`,
      });
    }

    if (dto.reminderStartDate && DateTime.fromFormat(dto.reminderStartDate, 'yyyy-MM-dd').isValid === false) {
      errors.push({
        field: 'reminderStartDate',
        message: `reminderStartDate must be a valid yyyy-MM-dd date`,
      });
    }

    if (dto.reminderStartTime && DateTime.fromFormat(dto.reminderStartDate, 'yyyy-MM-dd').isValid === false) {
      errors.push({
        field: 'reminderStartTime',
        message: `reminderStartTime must be a valid HH:mm time`,
      });
    }

    if (dto.reminderEndDate && DateTime.fromFormat(dto.reminderStartDate, 'yyyy-MM-dd').isValid === false) {
      errors.push({
        field: 'reminderEndDate',
        message: `reminderEndDate must be a valid yyyy-MM-dd date`,
      });
    }

    if (dto.reminderEndTime && DateTime.fromFormat(dto.reminderEndTime, 'yyyy-MM-dd').isValid === false) {
      errors.push({
        field: 'reminderEndTime',
        message: `reminderEndTime must be a valid HH:mm time`,
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
        errors.push({
          field: 'reminderRecurrenceIntervalUnit',
          message: `reminderRecurrenceIntervalUnit is required`,
        });
      }
    }

    if (!dto.reminderStartDate && dto.reminderStartTime) {
      errors.push({
        field: 'reminderStartDate',
        message: `reminderStartDate is required when reminderStartTime is set`,
      });
    }

    if (!dto.reminderEndDate && dto.reminderEndTime) {
      errors.push({
        field: 'reminderEndDate',
        message: `reminderEndDate is required when reminderEndTime is set`,
      });
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
      console.log(dto);
      if (startDate > endDate) {
        errors.push({
          field: 'reminderEndTime',
          message: `reminderEndTime must be after reminderStartDate`,
        });
      }
    }

    if (dto.reminderRecurrenceIntervalUnit) {
      if (!REMINDER_RECURRENCE_INTERVAL_UNITS.includes(dto.reminderRecurrenceIntervalUnit)) {
        errors.push({
          field: 'reminderRecurrenceIntervalUnit',
          message: `reminderRecurrenceIntervalUnit must be either: ${REMINDER_RECURRENCE_INTERVAL_UNITS.join(', ')}`,
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
  }

  if (errors.length) {
    return { errors };
  }

  return true;
};

export const getNextReminderExecutionDate = (dto: ActionDto, currentDate: Date = new Date()): Date | null => {
  if (!dto.reminderEnabled) {
    return null;
  }

  const now = DateTime.fromJSDate(currentDate);
  const startDateString =
    dto.reminderStartDate && dto.reminderStartTime
      ? `${dto.reminderStartDate}T${dto.reminderStartTime}:00`
      : dto.reminderStartDate;
  const endDateString =
    dto.reminderEndDate && dto.reminderEndTime
      ? `${dto.reminderEndDate}T${dto.reminderEndTime}:00`
      : dto.reminderEndDate;
  const startDate = startDateString ? DateTime.fromISO(startDateString) : null;
  const endDate =
    endDateString && dto.reminderIntervalType !== 'only_once' // Safety check - we only care about the end date, is the type isn't only_once
      ? DateTime.fromISO(endDateString)
      : null;

  if (!startDate) {
    return null;
  }

  let nextExecution: DateTime | null = null;

  if (dto.reminderIntervalType === 'only_once') {
    if (now < startDate) {
      nextExecution = startDate;
    }
  } else if (dto.reminderIntervalType === 'recurring_every_x_y') {
    const interval = Duration.fromObject({
      [`${dto.reminderRecurrenceIntervalUnit}s`]: dto.reminderRecurrenceIntervalAmount,
    });
    nextExecution = startDate;

    while (nextExecution <= now) {
      nextExecution = nextExecution.plus(interval);
    }

    if (dto.reminderRecurrenceVarianceAmount && dto.reminderRecurrenceVarianceUnit) {
      nextExecution = applyVariance(
        nextExecution,
        dto.reminderRecurrenceVarianceAmount,
        `${dto.reminderRecurrenceVarianceUnit}s`
      );
    }
  } else if (dto.reminderIntervalType === 'recurring_x_times_per_y') {
    const interval = Duration.fromObject({
      [`${dto.reminderRecurrenceIntervalUnit}s`]: dto.reminderRecurrenceIntervalAmount,
    });
    const startOfPeriod = now.startOf(dto.goalIntervalUnit);
    const endOfPeriod = now.endOf(dto.goalIntervalUnit);
    let currentExecution = startDate;
    let executionCount = 0;

    while (currentExecution <= endOfPeriod && (!endDate || currentExecution <= endDate)) {
      if (currentExecution >= startOfPeriod && currentExecution <= now) {
        executionCount++;
      }
      currentExecution = currentExecution.plus(interval);
    }

    if (executionCount < dto.goalAmount && (!endDate || currentExecution <= endDate)) {
      nextExecution = currentExecution;
    }

    if (dto.reminderRecurrenceVarianceAmount && dto.reminderRecurrenceVarianceUnit) {
      nextExecution = applyVariance(
        nextExecution,
        dto.reminderRecurrenceVarianceAmount,
        `${dto.reminderRecurrenceVarianceUnit}s`
      );
    }
  }

  if (nextExecution) {
    if (endDate && nextExecution > endDate) {
      return endDate.toJSDate();
    }

    return nextExecution.toJSDate();
  }

  return null;
};

const applyVariance = (
  nextExecution: DateTime,
  varianceAmount: number,
  varianceUnit: keyof DurationLikeObject
): DateTime => {
  const variance = Math.floor(Math.random() * varianceAmount);
  return nextExecution.plus({ [varianceUnit]: variance });
};
