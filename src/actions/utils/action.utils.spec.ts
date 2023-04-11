import { ActionDto } from '../dtos/action.dto';
import { getNextReminderExecutionDate } from './action.utils';

const baseActionDto: ActionDto = {
  id: '12345',
  template: null,
  name: 'Test Action',
  description: null,
  iconUrl: null,
  goalType: 'binary' as const,
  goalAmount: null,
  goalUnit: null,
  goalIntervalUnit: 'day' as const,
  reminderEnabled: true,
  reminderIntervalType: 'only_once' as const,
  reminderStartDate: '2023-04-01T00:00:00.000Z',
  reminderEndDate: null,
  reminderStartTime: null,
  reminderEndTime: null,
  reminderRecurrenceIntervalAmount: 1,
  reminderRecurrenceIntervalUnit: 'day' as const,
  reminderRecurrenceVarianceAmount: null,
  reminderRecurrenceVarianceUnit: 'minute' as const,
  reminderLastExecutedAt: null,
  reminderNextExecutesAt: null,
  reminderMuteEndsAt: null,
  goalNextPeriodExpiresAt: null,
  enteredAt: null,
  createdAt: new Date('2021-01-01T00:00:00.000Z'),
  updatedAt: new Date('2021-01-01T00:00:00.000Z'),
};

describe('getNextReminderExecutionDate', () => {
  it('returns null when reminder is disabled', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderEnabled: false,
    };

    expect(getNextReminderExecutionDate(actionDto)).toBeNull();
  });

  it('returns null when reminder without startDate', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'only_once',
    };

    const currentDate = new Date('2023-04-06T10:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toBeNull();
  });

  it('returns correct date when reminder with only_once type', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'only_once',
      reminderStartDate: '2023-05-01',
      reminderStartTime: '13:00',
    };

    const currentDate = new Date('2023-04-30T14:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toEqual(new Date('2023-05-01T13:00:00'));
  });

  it('returns null when reminder with only_once type and past date', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'only_once',
      reminderStartDate: '2023-04-01',
      reminderStartTime: '08:00',
    };

    const currentDate = new Date('2023-04-06T10:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toBeNull();
  });

  it('returns correct date when reminder with recurring_every_x_y type', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'recurring_every_x_y',
      reminderStartDate: '2023-04-01',
      reminderStartTime: '08:00',
      reminderRecurrenceIntervalAmount: 2,
      reminderRecurrenceIntervalUnit: 'day',
    };

    const currentDate = new Date('2023-04-02T09:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toEqual(new Date('2023-04-03T08:00:00'));
  });

  it('returns last occurrence date when reminder with recurring_every_x_y type and past endDate', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'recurring_every_x_y',
      reminderStartDate: '2023-04-01',
      reminderStartTime: '08:00',
      reminderEndDate: '2023-04-05',
      reminderEndTime: '18:00',
      reminderRecurrenceIntervalAmount: 1,
      reminderRecurrenceIntervalUnit: 'day',
    };

    const currentDate = new Date('2023-04-06T10:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toEqual(new Date('2023-04-05T18:00:00'));
  });

  it('returns correct date when reminder with recurring_x_times_per_y type', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'recurring_x_times_per_y',
      reminderStartDate: '2023-04-01',
      reminderStartTime: '08:00',
      reminderRecurrenceIntervalAmount: 2,
      reminderRecurrenceIntervalUnit: 'day',
      goalAmount: 3,
      goalIntervalUnit: 'week',
    };

    const currentDate = new Date('2023-04-02T09:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toEqual(new Date('2023-04-03T08:00:00'));
  });

  it('returns null when reminder with recurring_x_times_per_y type and all occurrences complete', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'recurring_x_times_per_y',
      reminderStartDate: '2023-04-01',
      reminderStartTime: '08:00',
      reminderRecurrenceIntervalAmount: 2,
      reminderRecurrenceIntervalUnit: 'day',
      goalAmount: 3,
      goalIntervalUnit: 'week',
    };

    const currentDate = new Date('2023-04-15T09:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toBeNull();
  });

  it('returns correct date when reminder with recurring_x_times_per_y type and an endDate', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'recurring_every_x_y',
      reminderStartDate: '2023-04-01',
      reminderStartTime: '08:00',
      reminderRecurrenceIntervalAmount: 2,
      reminderRecurrenceIntervalUnit: 'day',
      reminderEndDate: '2023-04-03',
      reminderEndTime: '07:00',
    };

    const currentDate = new Date('2023-04-02T09:00:00');

    expect(getNextReminderExecutionDate(actionDto, currentDate)).toEqual(new Date('2023-04-03T07:00:00'));
  });

  it('returns correct date within variance range when reminder with recurring_every_x_y type and variance', () => {
    const actionDto: ActionDto = {
      ...baseActionDto,
      reminderIntervalType: 'recurring_every_x_y',
      reminderStartDate: '2023-04-02',
      reminderStartTime: '08:00',
      reminderRecurrenceIntervalAmount: 1,
      reminderRecurrenceIntervalUnit: 'day',
      reminderRecurrenceVarianceAmount: 15,
      reminderRecurrenceVarianceUnit: 'minute',
    };

    const currentDate = new Date('2023-04-02T09:00:00');
    const nextExecution = getNextReminderExecutionDate(actionDto, currentDate);

    expect(nextExecution.getTime()).toBeGreaterThanOrEqual(new Date('2023-04-03T08:00:00').getTime());
    expect(nextExecution.getTime()).toBeLessThanOrEqual(new Date('2023-04-03T08:15:00').getTime());
  });
});
