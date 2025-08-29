import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  out: "./drizzle",
  migrations: {
    prefix: "timestamp"
  },
  tablesFilter: ["celerihealth-patient_*"],
  ...(env.NODE_ENV === "development" && { verbose: true })
} satisfies Config;
