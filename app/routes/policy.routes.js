module.exports = (app) => {
  const policies = require("../controllers/policy.controller.js");

  var router = require("express").Router();

  // Create a new Policies
  router.post("/", policies.create);

  // Retrieve all Policies
  router.get("/", policies.findAll);

  // Retrieve a single Policy with id
  router.get("/:id", policies.findOne);

  // Update a Policies with id
  router.put("/:id", policies.update);

  // Delete a Policies with id
  router.delete("/:id", policies.delete);

  router.post("/checkaccess", policies.checkaccess);

  app.use("/api/policies", router);
};
