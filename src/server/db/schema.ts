// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { relations, sql } from "drizzle-orm";
import { index, int, sqliteTableCreator, text } from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = sqliteTableCreator((name) => `ai-chatbot_${name}`);

export const session = createTable(
  "session",
  {
    id: text("id").notNull().primaryKey(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`(unixepoch())`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" }).$onUpdate(
      () => new Date()
      
    ),
  },
  (session) => ({}) 
);

export const messages = createTable(
  "messages",
  {
    id: text("id").notNull().primaryKey(),
    content: text("content").notNull(),
    role: text("role", { enum: ['user', 'assistant', 'system', 'data'] }).notNull(),
    sessionId: text("sessionId").references(() => session.id).notNull(),
    createdAt: int("created_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: int("updated_at", { mode: "timestamp" })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (messages) => ({
    sessionIdIndex: index("chat_id_idx").on(messages.sessionId),
  }),
);

export const sessionRelations = relations(session, ({ many }) => ({
  messages: many(messages),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  session: one(session, {
    fields: [messages.sessionId],
    references: [session.id],
  }),
}));
