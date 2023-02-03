module.exports = (app) => {
  const blog = require("../controllers/blog.controller.js");

  var router = require("express").Router();

  // Create a new blog
  router.post("/", blog.create);

  // Retrieve all blog
  router.get("/", blog.findAll);

  // Retrieve a single blog with id
  router.get("/:id", blog.findOne);

  // Update a blog with id
  router.put("/:id", blog.update);

  // Delete a blog with id
  router.delete("/:id", blog.delete);

  app.use("/api/blog", router);
};
