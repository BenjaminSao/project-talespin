import { Image } from "../models/image_model.js";

import { Router } from "express";
export const imageRouter = Router();

// Returns an image given it's ID
imageRouter.get("/:iid", async (req, res) => {
  try {
    const image = await Image.findByPk(req.params.iid);

    if (!image) {
      return res.status(404).json({
        message: "No Image Found For Given ID",
      });
    }

    res.setHeader("Content-Type", "image/jpeg").send(image.image);
  } catch (e) {
    return res.status(500).json({
      message: "Internal Server Error, Failed to Query For Image",
      e,
    });
  }
});
