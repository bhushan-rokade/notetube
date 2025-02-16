import getTranscript from './youtube-transcript';
const { GoogleGenerativeAI } = require('@google/generative-ai');
type TransObj = {
  text: string;
  duration: number;
  offset: number;
  lang: string;
};
require('dotenv').config();
const api_key = process.env.API_KEY;
const getGeminiRes = async (URL: string, mesg: string) => {
  const trans: Array<TransObj> = await getTranscript(URL);
  const genAI = new GoogleGenerativeAI(api_key);
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
  let subprompt: string = '';
  trans.forEach((element: TransObj) => {
    subprompt += element.text + ' ';
  });
  const prompt: string = subprompt + ` \n ${mesg} `;

  const result = await model.generateContent(prompt);
  console.log(result.response.text());
  return result.response.text();
};
export default getGeminiRes;
