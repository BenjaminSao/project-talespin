import { ChatGPTAPI } from "chatgpt";
import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
dotenv.config();

// Initialize ChatGPTAPI to call
export const chatGPTAPI = new ChatGPTAPI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize DALL-E to call
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const openAIAPI = new OpenAIApi(configuration);
