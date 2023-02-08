// module.exports = (app) => {
const serverless = require("serverless-http");

module.exports.handler = serverless((app) => {
  const carreview = require("../controllers/carreview.controller.js");

  var router = require("express").Router();

  // Create a new car review
  router.post("/", carreview.create);

  // Retrieve all car review
  router.get("/", carreview.findAll);

  // Retrieve a single car review with id
  router.get("/:id", carreview.findOne);

  // Update a car review with id
  router.put("/:id", carreview.update);

  // Delete a car review with id
  router.delete("/:id", carreview.delete);

  app.use("/api/carreview", router);
});
