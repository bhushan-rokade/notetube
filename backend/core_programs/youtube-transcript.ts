import { YoutubeSubs } from 'youtube-subs';

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
    const transcript = await YoutubeSubs.getSubs(videoId, { lang });

    return transcript.map((item) => ({
      text: item.text,
      duration: item.dur,
      offset: item.start,
      lang: lang,
    }));
  } catch (error) {
    console.error('Error fetching transcript:', error);
    return [];
  }
}

export default getTranscript;
