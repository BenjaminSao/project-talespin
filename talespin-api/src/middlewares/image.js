import { ChatGPTAPI } from "chatgpt";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

// Must have generatedStory created to run.
export const generatePrompts = async (req, res, next) => {
  const generatedStory = req.body.generatedStory;
  try {
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const messagePrefix =
      "Give me an image description for each of the text paragraphs below based on the content (separate each description with a newline character):";

    const imagePrompts = await api.sendMessage(messagePrefix + generatedStory);
    req.body.imagePrompts = imagePrompts.text;

    let imagePromptsArray = imagePrompts.text.split("\n");

    //Numerical Prefix + empty string remover
    imagePromptsArray = imagePromptsArray
      .map((item) => {
        const match = item.match(/^\d+\.\s/);
        return match ? item.substring(match[0].length) : item;
      })
      .filter((str) => str !== "");

    req.body.imagePromptsArray = imagePromptsArray;

    next();
  } catch (e) {
    next(e);
  }
};

export const generateImages = async (req, res, next) => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const imagePromptsArray = req.body.imagePromptsArray;
    const modifiers = " artstation";

    const imageURLArray = [];

    for (const prompt of imagePromptsArray) {
      try {
        const response = await openai.createImage({
          prompt: prompt + modifiers,
          n: 1,
          size: "1024x1024",
        });
        const image_url = response.data.data[0].url;
        imageURLArray.push(image_url);
      } catch (e) {
        console.error(e);
      }
    }

    req.body.imageURLArray = imageURLArray;

    next();
  } catch (e) {
    next(e);
  }
};
