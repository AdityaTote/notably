import { relations } from 'drizzle-orm'
import { text } from 'drizzle-orm/sqlite-core'
import { sqliteTable } from 'drizzle-orm/sqlite-core'

export const tagModel = sqliteTable('tags', {
    name: text('name').notNull().primaryKey(),
})

export const tagRelation = relations(tagModel, ({ many }) => ({
    notes: many(tagModel),
}))
