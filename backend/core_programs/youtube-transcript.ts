const { YoutubeTranscript } = require('youtube-transcript');
type TransObj = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};
function getTranscript(url: string): Array<TransObj> {
  const transcript: Array<TransObj> = YoutubeTranscript.fetchTranscript(url);
  return transcript;
}
export default getTranscript;
