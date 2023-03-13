import { generateStory } from "../middlewares/story.js";
import { generatePrompts, generateImages } from "../middlewares/image.js";
import { Router } from "express";

export const storyRouter = Router();

// TODO: move middleware into services
storyRouter.post(
  "/generate-story/",
  generateStory,
  generatePrompts,
  generateImages,
  async (req, res) => {
    const storyArray = req.body.storyArray;
    const imageURLArray = req.body.imageURLArray;

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
  }
);
