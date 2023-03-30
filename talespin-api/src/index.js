import express from "express";

import { storyRouter } from "./routers/story_router.js";

import { log } from "./middlewares/log_middleware.js";
import cors from "cors";
import bodyParser from "body-parser";
import { getUserId } from "./utils/authentication_util.js";
import { checkJwt } from "./middlewares/authentication_middleware.js";

import { sequelizeSetup } from "./configs/sequelize_config.js";
import { errorHandling } from "./middlewares/error_handling_middleware.js";

// Express Setup
const PORT = process.env.API_URL || 3001;
export const app = express();

// Use Routers
// TODO: Get Rid of This
app.get("/stories", checkJwt, async function (req, res) {
  const userId = getUserId(req);

  res.status(200).json({
    userId,
  });
});
app.use("/api/story", storyRouter);

_serverSetup();
_runServer();

async function _serverSetup() {
  app.use(bodyParser.json());
  app.use(cors());
  app.use(log);
  app.use(errorHandling);
  await sequelizeSetup();
}

function _runServer() {
  app.listen(PORT, (e) => {
    if (e) console.log(e);
    else console.log("Server is running on Port:", PORT);
  });
}
