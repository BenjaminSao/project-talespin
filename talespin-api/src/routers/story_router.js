import { convertToArray } from "../utils/api_utils.js";
import { generateStory } from "../services/story_service.js";
import { generatePrompts, generateImages } from "../services/image_service.js";

import { Router } from "express";

export const storyRouter = Router();

// Given a story prompt, generate an object containing pages of the children's story book
storyRouter.post("/generateStory/", async (req, res) => {
  const storyPrompt = req.body.prompt;
  const story = await generateStory(storyPrompt);
  const imagePrompts = await generatePrompts(story);

  const imageURLArray = await generateImages(convertToArray(imagePrompts));
  const storyArray = convertToArray(story);

  const storyPageContent = [];
  for (let i = 0; i < storyArray.length; i++) {
    const image = imageURLArray[i];
    const text = storyArray[i];
    storyPageContent.push({
      image: image,
      text: text,
    });
  }
  const finalBookContent = {
    pages: storyPageContent,
  };

  res.status(200).json(finalBookContent);
});
