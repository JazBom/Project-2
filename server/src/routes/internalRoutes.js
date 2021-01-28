// import express
const express = require("express");

// Create a new router to handle internal routes
const router = express.Router();
router.get("/", (request, response) =>
response.send("Handling root requests to internal routes")
);
// Add a health check route
router.get("/_health", (request, response) => response.send("OK"));

// router.get("/imageObjects", (request, response) =>
//   response.send("Return all image objects")
// );
// router.get("/quiz", (request, response) =>
//   response.send("This is the answer for the quiz!")
// );
// Export your internal router so it can be used by index.js
module.exports = router;
