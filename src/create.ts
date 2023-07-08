import 'dotenv/config';

import { getVideos, processVideo, tokensUsed } from './lib';

(async () => {
  const videos = getVideos();

  for (const video of videos) {
    console.log(`Processing video: ${video.title}`);

    const response = await processVideo(video);

    console.log(response.data.data);
  }

  console.log(`Tokens used: ${tokensUsed}`);
})();
