import { chatGPTAPI, openAIAPI } from "../configs/openai_apis.js";
import axios from "axios";
import { Image } from "../models/image_model.js";

// DALLE-IMAGE SECTION

// Given a story, turn it into image prompts
export async function generatePrompts(story) {
  const messagePrefix = `Give me an image description for each of the text paragraphs
  below based on the content (separate each description with a newline character):`;

  const imagePrompts = await chatGPTAPI.sendMessage(messagePrefix + story);
  return imagePrompts.text;
}

export async function generateImages(imagePrompts, modifier) {
  const modiferToKeywords = {
    "colorful": " artstation",
    "minimal": " artstation and minimal",
    "realistic": "artstation and hyper-realistic"
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

// DATABASE IMAGE SECTION

// Given an array of image URLs and a story ID, save them to the database
// and return an array of their ID's
export async function saveImgUrlArr(imgArr) {
  let imageIdArr = [];
  let count = 1;
  for (const url of imgArr) {
    const order = count;
    const image = await axios.get(url, { responseType: "arraybuffer" });
    const result = await Image.create({
      order: order,
      image: image.data,
    });
    imageIdArr.push(result.id);
    count = count + 1;
  }
  return imageIdArr;
}
