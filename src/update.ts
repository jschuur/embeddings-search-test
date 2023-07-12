import 'dotenv/config';
import { eq } from 'drizzle-orm';

import { loadVideos, updateVideo } from './db/db';
import { Video, videos } from './db/schema';
import { getEmbedding, tokensUsed } from './openai';

import 'dotenv/config';

async function processVideo(video: Video) {
  console.log(`Updating video '${video.title}'`);

  if (video.title) {
    const embedding = await getEmbedding(video.title);

    try {
      await updateVideo({
        set: { embedding },
        where: eq(videos.videoId, video.videoId),
      });
    } catch (e) {
      console.log(e.message);
    }
  } else {
    console.log(`Skipping video ID '${video.videoId}' with no title`);
  }
}

(async () => {
  const limit = parseInt(process.argv[2]) || 100;

  const videoBatch = await loadVideos(limit);

  console.log(`Processing ${videoBatch.length} videos\n`);

  for (const video of videoBatch) await processVideo(video);

  console.log(`\nTokens used: ${tokensUsed}`);

  process.exit(0);
})();
