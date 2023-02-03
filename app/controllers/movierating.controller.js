const db = require("../models");
const Movierating = db.movierating;

// Create and Save a new Policy
exports.create = (req, res) => {
  // Validate request
  debugger;
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Movierating
  const movierating = new Movierating({
    title: req.body.title,
    star_rating: req.body.star_rating,
    //image: [{ type: Blob }],
    rating_count: req.body.rating_count,
    // Image
    description: req.body.description,
    category: req.body.Category,
  });

  // Save Movierating in the database
  movierating
    .save(movierating)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Movierating.",
      });
    });
};

// Retrieve all Movierating from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Movierating.find(condition)
    .then((data) => {
      var result = {};

      data.map((itm) => {
        result[itm.title] = {
          id: itm._id,
          title: itm.title,
          star_rating: itm.star_rating,
          rating_count: itm.rating_count,
          // Image
          description: itm.description,
          category: itm.Category,
        };
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Movierating.",
      });
    });
};

// Find a single Movierating with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Movierating.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found Movierating with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Movierating with id=" + id });
    });
};

// Update a Movierating by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Movierating.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Movierating with id=${id}. Maybe Movierating was not found!`,
        });
      } else res.send({ message: "Movierating was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Movierating with id=" + id,
      });
    });
};

// Delete a Movierating with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Movierating.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Movierating with id=${id}. Maybe Movierating was not found!`,
        });
      } else {
        res.send({
          message: "Movierating was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Movierating with id=" + id,
      });
    });
};
