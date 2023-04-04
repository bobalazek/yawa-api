export const convertToSeconds = (amount: number, unit: string): number => {
  let multiplier = 1;
  switch (unit) {
    case 'second':
    case 'seconds':
      multiplier = 1;
      break;
    case 'minute':
    case 'minutes':
      multiplier = 60;
      break;
    case 'hour':
    case 'hours':
      multiplier = 60 * 60;
      break;
    case 'day':
    case 'days':
      multiplier = 60 * 60 * 24;
      break;
    case 'week':
    case 'weeks':
      multiplier = 60 * 60 * 24 * 7;
      break;
    case 'month':
    case 'months':
      multiplier = 60 * 60 * 24 * 30;
      break;
    case 'year':
    case 'years':
      multiplier = 60 * 60 * 24 * 365;
      break;
    default:
      multiplier = 1;
      break;
  }

  return amount * multiplier;
};

export const isValidTimeShort = (value: string): boolean => {
  const regex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
  return regex.test(value);
};
