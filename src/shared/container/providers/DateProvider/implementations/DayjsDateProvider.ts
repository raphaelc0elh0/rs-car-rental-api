import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  async compareInHours(start_date: Date, end_date: Date): Promise<number> {
    const startDateFormatted = await this.convertToUTC(start_date);
    const endDateFormatted = await this.convertToUTC(end_date);
    return dayjs(endDateFormatted).diff(startDateFormatted, "hours");
  }

  async compareInDays(start_date: Date, end_date: Date): Promise<number> {
    const startDateFormatted = await this.convertToUTC(start_date);
    const endDateFormatted = await this.convertToUTC(end_date);
    return dayjs(endDateFormatted).diff(startDateFormatted, "days");
  }

  async convertToUTC(date: Date): Promise<string> {
    return dayjs(date).utc().local().format();
  }
}

export { DayjsDateProvider };
