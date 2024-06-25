import "dotenv/config";
import { Kysely, MssqlDialect } from "kysely";
import * as tarn from "tarn";
import * as tedious from "tedious";

const dialect = new MssqlDialect({
  tarn: {
    ...tarn,
    options: {
      max: 1,
      min: 1,
      idleTimeoutMillis: 60000,
      log: (message) => console.log(message),
      reapIntervalMillis: 1000000,
    },
  },
  tedious: {
    ...tedious,
    connectionFactory: () =>
      new tedious.Connection({
        authentication: {
          options: {
            userName: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
          },
          type: "default",
        },
        options: {
          port: Number.parseInt(process.env.DB_PORT),
          trustServerCertificate: true,
          connectionTimeout: 60000,
          requestTimeout: 60000,
        },
        server: process.env.DB_HOSTNAME,
      }),
  },
});

const sql = new Kysely({
  dialect,
});

await sql.selectFrom("sys.tables").selectAll().top(1).execute();
await sql.selectFrom("sys.tables").selectAll().top(1).execute();
console.log("done");
