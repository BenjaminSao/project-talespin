import { chatGPTAPI, openAIAPI } from "../configs/openai_apis.js";

// Given a story, turn it into image prompts
export async function generatePrompts(story) {
  const messagePrefix = `Give me an image description for each of the text paragraphs
  below based on the content (separate each description with a newline character):`;

  const imagePrompts = await chatGPTAPI.sendMessage(messagePrefix + story);
  return imagePrompts.text;
}

export async function generateImages(imagePrompts, modifier = "high_quality") {
  const modiferToKeywords = {
    high_quality: " artstation",
  };

  const imageURLArray = [];
  for (const prompt of imagePrompts) {
    const response = await openAIAPI.createImage({
      prompt: prompt + modiferToKeywords[modifier],
      n: 1,
      size: "1024x1024",
    });
    const image_url = response.data.data[0].url;
    imageURLArray.push(image_url);
  }

  return imageURLArray;
}
