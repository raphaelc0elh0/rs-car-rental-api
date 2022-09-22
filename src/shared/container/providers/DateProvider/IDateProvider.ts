interface IDateProvider {
  compareIfBefore(first_date: Date, last_date: Date): boolean;
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  addSecondsToDate(date: Date, seconds: number): Date;
}

export { IDateProvider };
