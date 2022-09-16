import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc);

class DayjsDateProvider implements IDateProvider {
  async convertToUTC(date: Date): Promise<string> {
    return dayjs(date).utc().local().format();
  }

  async compareInHours(start_date: Date, end_date: Date): Promise<number> {
    const startDateFormatted = await this.convertToUTC(start_date);
    const endDateFormatted = await this.convertToUTC(end_date);
    return dayjs(endDateFormatted).diff(startDateFormatted, "hours");
  }
}

export { DayjsDateProvider };
