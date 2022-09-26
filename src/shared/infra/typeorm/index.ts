import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "localhost"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  return createConnection(
    Object.assign(
      defaultOptions,
      process.env.NODE_ENV === "test"
        ? { host, database: "rs-rentx-db-test" }
        : { host }
    )
  );
};
