// module.exports = (app) => {
const serverless = require("serverless-http");

module.exports.handler = serverless((app) => {
  const movierating = require("../controllers/movierating.controller.js");

  var router = require("express").Router();

  // Create a new car review
  router.post("/", movierating.create);

  // Retrieve all car review
  router.get("/", movierating.findAll);

  // Retrieve a single car review with id
  router.get("/:id", movierating.findOne);

  // Update a car review with id
  router.put("/:id", movierating.update);

  // Delete a car review with id
  router.delete("/:id", movierating.delete);

  app.use("/api/movierating", router);
});
