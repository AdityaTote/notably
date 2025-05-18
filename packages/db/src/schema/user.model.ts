import { relations } from "drizzle-orm";
import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { noteModel } from "./note.model";

export const userModel = sqliteTable("users", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  username: text().notNull().unique(),
  email: text().notNull().unique(),
  password: text().notNull(),
});

export const userRelation = relations(userModel, ({many}) => ({
  notes: many(noteModel)
}))