import 'dotenv/config';
import { readFileSync } from 'fs';
import { Configuration, CreateEmbeddingRequest, OpenAIApi } from 'openai';
import { z } from 'zod';

declare const process: {
  env: {
    OPENAI_API_KEY: string;
  };
};

const EMBEDDING_MODEL = 'text-embedding-ada-002';

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

const VideoSchema = z.object({
  id: z.string(),
  title: z.string(),
});
export type Video = z.infer<typeof VideoSchema>;

export let tokensUsed = 0;

export function getVideos(): Video[] {
  const rawData = readFileSync('src/videos.json');
  const data = JSON.parse(rawData.toString());
  const videos = z.array(VideoSchema).parse(data);

  return videos;
}

export async function processVideo(video: Video) {
  const request: CreateEmbeddingRequest = {
    input: video.title,
    model: EMBEDDING_MODEL,
  };

  const response = await openai.createEmbedding(request);

  tokensUsed += response.data.usage.total_tokens;

  return response;
}
