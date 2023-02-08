// module.exports = (app) => {
const serverless = require("serverless-http");
module.exports.handler = serverless((app) => {
  const restaurant = require("../controllers/restaurant.controller.js");

  var router = require("express").Router();

  // Create a new Policies
  router.post("/", restaurant.create);

  // Retrieve all Policies
  router.get("/", restaurant.findAll);

  // Retrieve a single Policy with id
  router.get("/:id", restaurant.findOne);

  // Update a Policies with id
  router.put("/:id", restaurant.update);

  // Delete a Policies with id
  router.delete("/:id", restaurant.delete);

  app.use("/api/restaurant", router);
});
