import { ChatGPTAPI } from "chatgpt";
import dotenv from "dotenv";
dotenv.config();

export const generateStory = async (req, res, next) => {
  const prompt = req.body.prompt;
  const num_pages = 5;
  try {
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messagePrefix = `Create a story in the style of a children's storybook (Where each section is around 45 words, separated by a newline character, and there is a maximum of ${num_pages} sections) about:`;

    const story = await api.sendMessage(messagePrefix + prompt);
    req.body.generatedStory = story.text;

    var storyArray = story.text.split("\n");

    //Numerical Prefix remover + empty string remover
    storyArray = storyArray
      .map((item) => {
        const match = item.match(/^\d+\.\s/);
        return match ? item.substring(match[0].length) : item;
      })
      .filter((str) => str !== "");

    req.body.storyArray = storyArray;

    next();
  } catch (e) {
    next(e);
  }
};
