import jwt from "jsonwebtoken";

export function getUserId(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Authorization header missing or invalid");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.decode(token);
    return decoded.sub;
  } catch (err) {
    throw new Error("Invalid token");
  }
}


// Modifier buttons
// Color/book button
// Fix the pdf CRAP
