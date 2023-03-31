import { Story } from "../models/story_model.js";
import { constructEmail } from "../utils/email_utils.js";

import { Router } from "express";
import sgMail from "@sendgrid/mail";
export const emailRouter = Router();

// Given an email and a story id, send an email that shares a story
emailRouter.post("/", async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { email, storyId } = req.body;

  try {
    // Obtain story information
    const story = await Story.findByPk(storyId);
    await sgMail.send(constructEmail(email, story));
    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to send email" });
  }
});
