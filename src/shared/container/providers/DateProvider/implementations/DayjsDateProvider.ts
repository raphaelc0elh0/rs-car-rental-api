import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number {
    const startDateFormatted = this.convertToUTC(start_date);
    const endDateFormatted = this.convertToUTC(end_date);
    return dayjs(endDateFormatted).diff(startDateFormatted, "hours");
  }

  compareInDays(start_date: Date, end_date: Date): number {
    const startDateFormatted = this.convertToUTC(start_date);
    const endDateFormatted = this.convertToUTC(end_date);
    return dayjs(endDateFormatted).diff(startDateFormatted, "days");
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format();
  }

  addSecondsToDate(date: Date, seconds: number): Date {
    const formattedDate = this.convertToUTC(date);
    return dayjs(formattedDate).add(seconds, "seconds").toDate();
  }
}

export { DayjsDateProvider };
