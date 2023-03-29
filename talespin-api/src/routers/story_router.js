import { convertTextToArray } from "../utils/api_utils.js";
import { generateStory } from "../services/story_service.js";
import { generatePrompts, generateImages } from "../services/image_service.js";
import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";

export const storyRouter = Router();

// Given a story prompt, generate an object containing pages of the children's story book
storyRouter.post("/generateStory/", async (req, res) => {
  // Used for testing to not consume API credits while developing
  if (process.env.ENABLE_MOCK_API === "true") {
    const finalBookContent = {
      pages: [
        {
          image:
            "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
          text: "Once upon a time in a kingdom far away, there was a little knight named Timmy. Timmy was small in size but big in heart. He loved helping others and always went out of his way to make sure everyone was happy.",
        },
        {
          image:
            "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
          text: "One day, Timmy heard that there were many elderly people in the kingdom who were struggling. They were sick and needed help but no one was willing to go to their rescue. Timmy knew he had to help.",
        },
        {
          image:
            "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
          text: "Timmy set out on his journey to help the elderly. As he walked through the kingdom, he came across many scary monsters who tried to stop him. But Timmy was brave and fought them off with his sword.",
        },
        {
          image:
            "https://img.favpng.com/8/12/15/knight-royalty-free-clip-art-png-favpng-mS7Ngxa1h4WvV2cTFKwvfCzWy.jpg",
          text: "Finally, Timmy reached the village where the elderly lived. He saw that they were in terrible condition and needed medical attention. Timmy quickly went to work, tending to their wounds and making sure they had food and water.",
        },
      ],
    };
    return res.status(200).json(finalBookContent);
  }

  const storyPrompt = req.body.prompt;
  const story = await generateStory(storyPrompt);
  const imagePrompts = await generatePrompts(story);

  const imageURLArray = await generateImages(convertToArray(imagePrompts));
  const storyArray = convertTextToArray(story);

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
