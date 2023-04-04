import {
  convertTextToArray,
  mockStory,
  mockImageURLArray,
  mockImagePrompts,
} from "../utils/story_utils.js";
import { generateStory } from "../services/story_service.js";
import {
  generatePrompts,
  generateImages,
  saveImgUrlArr,
} from "../services/image_service.js";
import { Story } from "../models/story_model.js";
import dotenv from "dotenv";
dotenv.config();

import { Router } from "express";
import { checkJwt } from "../middlewares/authentication_middleware.js";
export const storyRouter = Router();

// Given a story prompt, generate an object containing pages of the children's story book
storyRouter.post("/", checkJwt, async (req, res) => {
  // Checking that all needed fields for story creation are here
  const { title, colorScheme, prompt, storyLength, artStyle, ownerId } =
    req.body;
  if (
    !title ||
    !colorScheme ||
    !prompt ||
    !storyLength ||
    !artStyle ||
    !ownerId
  ) {
    return res.status(400).json({
      message: "Invalid request, missing mandatory story creation parameter.",
    });
  }

  try {
    // Creating the storyContent object used in the frontend
    const story =
      process.env.ENABLE_MOCK_API === "true"
        ? mockStory()
        : await generateStory(prompt, storyLength);
    const storyArray = convertTextToArray(story);

    const imagePrompts =
      process.env.ENABLE_MOCK_API === "true"
        ? mockImagePrompts()
        : await generatePrompts(story);

    const imageURLArray =
      process.env.ENABLE_MOCK_API === "true"
        ? mockImageURLArray()
        : await generateImages(convertTextToArray(imagePrompts), artStyle);

    const imageIdArr = await saveImgUrlArr(imageURLArray);

    const storyPageContent = [];
    for (let i = 0; i < storyArray.length; i++) {
      const image = imageIdArr[i];
      const text = storyArray[i];
      storyPageContent.push({
        // image is an UUID
        image: image,
        text: text,
      });
    }
    const storyContent = {
      pages: storyPageContent,
    };

    const storyObj = await Story.create({
      title,
      colorScheme,
      prompt,
      storyLength,
      artStyle,
      storyContent,
      ownerId,
    });

    return res.status(200).json({
      storyId: storyObj.id,
      storyContent,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: "Internal Server Error, Failed to Create Story",
      e,
    });
  }
});

// Returns a list of high-level story data in an array of JSON's
storyRouter.get("/users/:uid", async (req, res) => {
  try {
    const stories = await Story.findAll({
      where: { ownerId: req.params.uid },
      attributes: ["id", "title", "colorScheme", "prompt"],
    });

    if (stories.length === 0) {
      return res.status(404).json({
        message: "No Stories Found for Given User Id",
      });
    }

    const storyInfoArray = stories.map((story) => {
      return {
        info: {
          id: story.id,
          title: story.title,
          colorScheme: story.colorScheme,
          prompt: story.prompt,
        },
      };
    });

    res.status(200).json(storyInfoArray);
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error, Failed to Query User Stories",
      e,
    });
  }
});

// Returns the content of a story given it's ID
storyRouter.get("/:sid", async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.sid, {
      attributes: ["storyContent"],
    });

    if (!story) {
      return res.status(404).json({
        message: "No Story Found for Given Story Id",
      });
    }

    res.status(200).json(story.storyContent);
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error, Failed to Query For Story",
      e,
    });
  }
});

// Changes the color scheme, or book title.
storyRouter.patch("/:sid", async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.sid);

    if (!story) {
      return res.status(404).json({
        message: "No Story Found for Given Story Id",
      });
    }

    const update = {};
    if (req.body.title) {
      update.title = req.body.title;
    } else if (req.body.colorScheme) {
      update.colorScheme = req.body.colorScheme;
    }

    const [, changedArr] = await Story.update(update, {
      where: { id: req.params.sid },
      returning: true,
    });

    res.status(200).json(changedArr[0]);
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error, Failed to Query/Change Story",
      e,
    });
  }
});

storyRouter.delete("/:sid", async (req, res) => {
  try {
    const story = await Story.findByPk(req.params.sid);

    if (!story) {
      return res.status(404).json({
        message: "No Story Found for Given Story Id",
      });
    }

    // TODO: Delete all associated images.
    await story.destroy();

    res.status(200).json({
      message: "Story succesfully deleted",
      story,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error, Failed to Delete Story",
      e,
    });
  }
});
