import express from "express";

import bodyParser from "body-parser";
import { storyRouter } from "./routers/story_router.js";
import { imageRouter } from "./routers/image_router.js";
import { log } from "./middlewares/log_middleware.js";

import cors from "cors";

import { sequelizeSetup } from "./configs/sequelize_config.js";
import { errorHandling } from "./middlewares/error_handling_middleware.js";

// Express Setup
const PORT = process.env.API_URL || 3001;
export const app = express();

_serverSetup();
_runServer();

async function _serverSetup() {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(log);

  // Setup routers
  app.use("/api/stories", storyRouter);
  app.use("/api/images", imageRouter);

  app.use(errorHandling);

  await sequelizeSetup();
}

function _runServer() {
  app.listen(PORT, (e) => {
    if (e) console.log(e);
    else console.log("Server is running on Port:", PORT);
  });
}
