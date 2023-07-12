import { drizzle } from 'drizzle-orm/postgres-js';
import { l2Distance } from 'pgvector/drizzle-orm';
import postgres from 'postgres';

import { SQL, isNull } from 'drizzle-orm';
import { SEARCH_LIMIT } from '../config';
import { Video, videos } from './schema';

const client = postgres();
export const db = drizzle(client);

export const loadVideos = (limit: number) =>
  db.select().from(videos).where(isNull(videos.embedding)).limit(limit);

export function saveVideo(video: Video) {
  return db.insert(videos).values(video);
}

export function updateVideo({ set, where }: { set: Partial<Video>; where: SQL }) {
  return db.update(videos).set(set).where(where);
}

export function searchVideos(embedding: number[], limit = SEARCH_LIMIT) {
  return db
    .select({
      videoId: videos.videoId,
      title: videos.title,
      viewCount: videos.viewCount,
      distance: l2Distance(videos.embedding, embedding),
    })
    .from(videos)
    .orderBy(l2Distance(videos.embedding, embedding))
    .limit(limit);
}
