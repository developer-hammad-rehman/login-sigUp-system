import {
    pgTable,
    serial,
    varchar
  } from "drizzle-orm/pg-core";
  import { drizzle } from "drizzle-orm/vercel-postgres";
  import { sql } from "@vercel/postgres";
export const userdata = pgTable("userdata" ,{
id: serial("id").primaryKey(),
email:varchar("email").notNull(),
password:varchar('password').notNull()
})
export const db = drizzle(sql)