import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(
      defaultOptions,
      process.env.NODE_ENV === "test"
        ? { host: "localhost", database: "rs-rental-car-db-test" }
        : { host }
    )
  );
};
