// dateUtils.ts

export const tileDisabled = (date: Date, disabledTimes: Date[]): boolean => {
    return (
      date >= new Date() && // Désactiver uniquement les dates futures
      disabledTimes.some((disabledTime) => {
        return (
          date.getFullYear() === disabledTime.getFullYear() &&
          date.getMonth() === disabledTime.getMonth() &&
          date.getDate() === disabledTime.getDate() &&
          date.getHours() === disabledTime.getHours() &&
          date.getMinutes() === disabledTime.getMinutes()
        );
      })
    );
  };
  


  // timeUtils.ts

import { add } from 'date-fns';

export const getTimes = (
  justDate: Date | null,
  INTERVAL: number,
  STORE_OPENING_AM_HOUR_TIME: number,
  STORE_OPENING_AM_MINUTE_TIME: number,
  STORE_ClOSING_HOUR_AM_TIME: number,
  STORE_ClOSING_MINUTE_AM_TIME: number,
  STORE_OPENING_PM_HOUR_TIME: number,
  STORE_OPENING_PM_MINUTE_TIME: number,
  STORE_ClOSING_HOUR_PM_TIME: number,
  STORE_ClOSING_MINUTE_PM_TIME: number
): Date[] | [] => {
  if (!justDate) return [];

  const beginningAM = add(justDate, { hours: STORE_OPENING_AM_HOUR_TIME, minutes: STORE_OPENING_AM_MINUTE_TIME });
  const endAM = add(justDate, { hours: STORE_ClOSING_HOUR_AM_TIME, minutes: STORE_ClOSING_MINUTE_AM_TIME });
  const beginningPM = add(justDate, { hours: STORE_OPENING_PM_HOUR_TIME, minutes: STORE_OPENING_PM_MINUTE_TIME });
  const endPM = add(justDate, { hours: STORE_ClOSING_HOUR_PM_TIME, minutes: STORE_ClOSING_MINUTE_PM_TIME });
  const interval = INTERVAL;

  const times = [];
  for (let i = beginningAM; i <= endAM; i = add(i, { minutes: interval })) {
    times.push(i);
  }
  for (let i = beginningPM; i <= endPM; i = add(i, { minutes: interval })) {
    times.push(i);
  }

  return times;
};

export const formatDateToISOString = (dated: any) => {
  const isoDate = dated.toISOString();
  const formattedDate = isoDate.replace(/[^\w\s]/gi, '');
  return formattedDate;       
};