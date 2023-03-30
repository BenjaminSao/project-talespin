export function errorHandling(err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      error: "Unauthorized",
    });
  } else {
    // Handle other errors as appropriate
    console.error(err);
    res.status(500).json({
      error: "Internal Server Error",
    });
  }
}
