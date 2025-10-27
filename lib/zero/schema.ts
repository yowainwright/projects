import { createSchema, createTableSchema } from '@rocicorp/zero';

const cardSchema = createTableSchema({
  tableName: 'cards',
  columns: {
    id: { type: 'string' },
    type: { type: 'string' },
    source: { type: 'string' },
    title: { type: 'string' },
    description: { type: 'string' },
    slug: { type: 'string', optional: true },
    variant: { type: 'string', optional: true },
    image: { type: 'string', optional: true },
    icon: { type: 'string', optional: true },
    date: { type: 'string', optional: true },
    tags: { type: 'json', optional: true },
    links: { type: 'json', optional: true },
    externalData: { type: 'json', optional: true },
    lastFetched: { type: 'number', optional: true },
    expiresAt: { type: 'number', optional: true },
  },
  primaryKey: 'id',
});

const interactionSchema = createTableSchema({
  tableName: 'interactions',
  columns: {
    cardId: { type: 'string' },
    viewCount: { type: 'number' },
    lastViewed: { type: 'number' },
    expanded: { type: 'boolean' },
    favorited: { type: 'boolean' },
  },
  primaryKey: 'cardId',
});

const preferencesSchema = createTableSchema({
  tableName: 'preferences',
  columns: {
    key: { type: 'string' },
    value: { type: 'json' },
  },
  primaryKey: 'key',
});

export const schema = createSchema({
  version: 1,
  tables: {
    cards: cardSchema,
    interactions: interactionSchema,
    preferences: preferencesSchema,
  },
});

export type Schema = typeof schema;
