import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { userModel } from './user.model';
import { relations } from 'drizzle-orm';

export const noteModel = sqliteTable('notes', {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    content: text().notNull(),
    userId: int()
        .notNull()
        .references(() => userModel.id),
});

export const noteRelation = relations(noteModel, ({ many }) => ({
    tags: many(noteModel),
}));
