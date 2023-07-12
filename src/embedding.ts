import 'dotenv/config';

import { getEmbedding } from './openai';

(async () => {
  const text = process.argv.slice(2).join(' ');
  const embeddingResponse = await getEmbedding(text);

  console.log(JSON.stringify(embeddingResponse, null, 2));
})();
