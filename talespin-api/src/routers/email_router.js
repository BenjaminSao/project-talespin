import { Story } from "../models/story_model.js";
import { constructEmail } from "../utils/email_utils.js";

import { Router } from "express";
import sgMail from "@sendgrid/mail";
import { checkJwt } from "../middlewares/authentication_middleware.js";
export const emailRouter = Router();

// Given an email and a story id, send an email that shares a story
emailRouter.post("/", checkJwt, async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { email, storyId } = req.body;

  try {
    // Obtain story information
    const story = await Story.findByPk(storyId);
    const thing = await constructEmail(email, story);
    await sgMail.send(thing);
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
