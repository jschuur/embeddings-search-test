import { Configuration, CreateEmbeddingRequest, OpenAIApi } from 'openai';

import { OPENAI_EMBEDDING_MODEL } from './config';

declare const process: {
  env: {
    OPENAI_API_KEY: string;
  };
};

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(config);

export let tokensUsed = 0;

export async function getEmbedding(text: string) {
  const request: CreateEmbeddingRequest = {
    input: text,
    model: OPENAI_EMBEDDING_MODEL,
  };

  const result = await openai.createEmbedding(request);

  tokensUsed += result.data.usage.total_tokens;

  return result.data.data[0].embedding;
}
