interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): Promise<number>;
  convertToUTC(date: Date): Promise<string>;
}

export { IDateProvider };
