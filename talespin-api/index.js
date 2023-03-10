import express from "express";
import bodyParser from "body-parser";

const PORT = process.env.API_URL || 3001;
export const app = express();
app.use(bodyParser.json());

// Add Endpoints Here!
app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "Hi!",
  });
});

app.listen(PORT, (e) => {
  if (e) console.log(e);
  else console.log("Server is running on Port:", PORT);
});
