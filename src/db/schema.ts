import { InferModel } from 'drizzle-orm';
import { date, integer, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { vector } from 'pgvector/drizzle-orm';

import { OPENAI_EMBEDDING_DIMENSIONS } from '../config';

export const videos = pgTable('videos', {
  videoId: varchar('videoId', { length: 16 }).primaryKey(),
  title: text('title'),
  publishedAt: date('publishedAt').notNull(),
  viewCount: integer('viewCount').notNull(),
  embedding: vector('embedding', { dimensions: OPENAI_EMBEDDING_DIMENSIONS }),
});

export type Video = InferModel<typeof videos>;
export type VideoData = Omit<Video, 'embedding'>;
