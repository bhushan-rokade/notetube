import { getSubtitles } from 'youtube-captions-scraper';

type TransObj = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};

function extractVideoId(url: string): string | null {
  const match = url.match(
    /(?:youtube\.com\/(?:.*v=|embed\/|v\/|shorts\/|live\/)|youtu\.be\/)([^&?/]+)/
  );
  return match ? match[1] : null;
}

async function getTranscript(videoUrl: string): Promise<Array<TransObj>> {
  try {
    const videoId = extractVideoId(videoUrl);
    if (!videoId) throw new Error('Invalid YouTube URL');

    const captions = await getSubtitles({ videoID: videoId, lang: 'en' });
    return captions.map((caption) => ({
      text: caption.text,
      duration: caption.dur,
      offset: caption.start,
      lang: 'en',
    }));
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return [];
  }
}

export default getTranscript;
