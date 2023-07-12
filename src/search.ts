import 'dotenv/config';

import { searchVideos } from './db/db';
import { getEmbedding } from './openai';

const viewCount = (count: number) => Intl.NumberFormat('en-US').format(count).padStart(12, ' ');

(async () => {
  const searchTerm = process.argv.slice(2).join(' ');

  console.log(`Getting embedding for "${searchTerm}"`);

  const searchTermEmbedding = await getEmbedding(searchTerm);

  console.log('Searching videos...');

  const startTime = Date.now();
  const searchResults = await searchVideos(searchTermEmbedding);

  console.log(`Search took ${Date.now() - startTime}ms\n`);

  for (const video of searchResults)
    console.log(
      `https://www.youtube.com/watch?v=${video.videoId} (${video.distance.toFixed(3)}, ${viewCount(
        video.viewCount
      )}) - ${video.title}`
    );

  process.exit(0);
})();
