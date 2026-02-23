import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Poll submissions — stores every completed poll response.
 * Original questions: q0-q6 (Lifestyle Intelligence Index)
 * New sections:
 *   Household & Life Stage: q7 (household type), q8 (household size), q9 (children), q9_ages (optional text)
 *   Age & Work Stage: q10 (age range), q11 (work status)
 *   Availability: q12 (availability), q13 (frequency)
 *   Wellness: q14 (wellness interests, multi-select comma-separated), q15 (fitness level)
 *   Lifestyle: q16 (lifestyle interests, multi-select comma-separated), q17 (event energy)
 *   Pets & Hobbies: q18 (pets), q18_other (optional text), q19 (hobbies, multi-select comma-separated)
 *   Communication: q20 (notification preference)
 */
export const pollSubmissions = mysqlTable("poll_submissions", {
  id: int("id").autoincrement().primaryKey(),
  email: varchar("email", { length: 320 }),
  // Original 7 questions
  q0: varchar("q0", { length: 255 }),
  q1: varchar("q1", { length: 255 }),
  q2: varchar("q2", { length: 255 }),
  q3: varchar("q3", { length: 255 }),
  q4: varchar("q4", { length: 255 }),
  q5: varchar("q5", { length: 255 }),
  q6: varchar("q6", { length: 255 }),
  // Household & Life Stage
  q7: varchar("q7", { length: 255 }),
  q8: varchar("q8", { length: 255 }),
  q9: varchar("q9", { length: 255 }),
  q9Ages: varchar("q9_ages", { length: 255 }),
  // Age & Work Stage
  q10: varchar("q10", { length: 255 }),
  q11: varchar("q11", { length: 255 }),
  // Availability
  q12: varchar("q12", { length: 255 }),
  q13: varchar("q13", { length: 255 }),
  // Wellness
  q14: varchar("q14", { length: 512 }),  // multi-select, comma-separated
  q15: varchar("q15", { length: 255 }),
  // Lifestyle
  q16: varchar("q16", { length: 512 }),  // multi-select, comma-separated
  q17: varchar("q17", { length: 255 }),
  // Pets & Hobbies
  q18: varchar("q18", { length: 255 }),
  q18Other: varchar("q18_other", { length: 255 }),
  q19: varchar("q19", { length: 512 }),  // multi-select, comma-separated
  // Communication
  q20: varchar("q20", { length: 255 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PollSubmission = typeof pollSubmissions.$inferSelect;
export type InsertPollSubmission = typeof pollSubmissions.$inferInsert;
