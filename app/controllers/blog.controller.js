const db = require("../models");
const Blog = db.blog;

// Create and Save a new Policy
exports.create = (req, res) => {
  debugger;
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a Blog
  const blog = new Blog({
    title: req.body.title,
    category: req.body.category,
    // image: req.body.image,
    content: req.body.content,
    signature: req.body.signature,
    reviewed: req.body.reviewed,
    approved: req.body.approved,
  });

  // Save Blog in the database
  blog
    .save(blog)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Blog.",
      });
    });
};

// Retrieve all Blog from the database.
exports.findAll = (req, res) => {
  debugger;
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Blog.find(condition)
    .then((data) => {
      var result = {};

      data.map((itm) => {
        result[itm.title] = {
          id: itm._id,
          title: itm.title,
          category: itm.category,
          image: itm.image,
          content: itm.content,
          signature: itm.signature,
          reviewed: itm.reviewed,
          approved: itm.approved,
        };
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving Blog.",
      });
    });
};

// Find a single Blog with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Blog with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Blog with id=" + id });
    });
};

// Update a Blog by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Blog.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Blog with id=${id}. Maybe Blog was not found!`,
        });
      } else res.send({ message: "Blog was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Blog with id=" + id,
      });
    });
};

// Delete a Blog with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Blog.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Blog with id=${id}. Maybe Blog was not found!`,
        });
      } else {
        res.send({
          message: "Blog was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Blog with id=" + id,
      });
    });
};
