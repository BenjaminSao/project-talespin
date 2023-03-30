import express from "express";
import bodyParser from "body-parser";
import { storyRouter } from "./routers/story_router.js";
import cors from "cors";

import { getUserId } from "./utils/authentication.js";
import { checkJwt } from "./middlewares/authentication_middleware.js";

import { sequelize } from "./datasource.js";
import { User } from "./models/user.js";
User;

const PORT = process.env.API_URL || 3001;
export const app = express();
app.use(bodyParser.json());
app.use(cors());

try {
  await sequelize.authenticate();
  await sequelize.sync({ alter: { drop: false } });
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

app.use(function (req, res, next) {
  console.log("HTTP request", req.method, req.url, req.body);
  next();
});

// Add Endpoints Here!
app.get("/stories", checkJwt, function (req, res) {
  const userId = getUserId(req);
  res.status(200).json({
    userId,
  });
});

// Set up routers
app.use("/api/story", storyRouter);

app.listen(PORT, (e) => {
  if (e) console.log(e);
  else console.log("Server is running on Port:", PORT);
});
