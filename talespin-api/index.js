import express from "express";
import bodyParser from "body-parser";
import { storyRouter } from "./src/routers/story_router.js";
import cors from "cors";

const PORT = process.env.API_URL || 3001;
export const app = express();
app.use(bodyParser.json());
app.use(cors());

// Add Endpoints Here!
app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Hi",
  });
});

// Set up routers
app.use("/api/story", storyRouter);

app.listen(PORT, (e) => {
  if (e) console.log(e);
  else console.log("Server is running on Port:", PORT);
});
