import 'dotenv/config';

import { VideoEmbedding, getVideos, processVideo, saveEmbeddings, tokensUsed } from './lib';

(async () => {
  const videos = getVideos();
  const embeddingData: VideoEmbedding[] = [];

  for (const video of videos) {
    console.log(`Processing video: ${video.title}`);

    const response = await processVideo(video);

    embeddingData.push({
      videoId: video.id,
      title: video.title,
      embedding: response.data.data[0].embedding,
    });
  }

  console.log(`Tokens used: ${tokensUsed}`);

  saveEmbeddings(embeddingData);
})();
