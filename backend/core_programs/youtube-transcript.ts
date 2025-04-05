import { YoutubeTranscript } from 'youtube-transcript';

type TransObj = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};

async function getTranscript(
  videoId: string,
  lang: string = 'en'
): Promise<Array<TransObj>> {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, {
      lang,
    });

    return transcript.map((item) => ({
      text: item.text,
      duration: item.duration || 0,
      offset: item.offset || 0,
      lang: lang,
    }));
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return [];
  }
}

export default getTranscript;
