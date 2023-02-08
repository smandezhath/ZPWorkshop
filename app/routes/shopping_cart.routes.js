// module.exports = (app) => {
const serverless = require("serverless-http");

module.exports.handler = serverless((app) => {
  const shopping_cart = require("../controllers/shopping_cart.controller.js");

  var router = require("express").Router();

  // Create a new Policies
  router.post("/", shopping_cart.create);

  // Retrieve all Policies
  router.get("/", shopping_cart.findAll);

  // Retrieve a single Policy with id
  router.get("/:id", shopping_cart.findOne);

  // Update a Policies with id
  router.put("/:id", shopping_cart.update);

  // Delete a Policies with id
  router.delete("/:id", shopping_cart.delete);

  app.use("/api/shopping_cart", router);
});
