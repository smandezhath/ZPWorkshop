const db = require("../models");
const CarReview = db.carreview;

// Create and Save a new Policy
exports.create = (req, res) => {
  debugger;
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "title can not be empty!" });
    return;
  }

  // Create a CarReview
  const carreview = new CarReview({
    title: req.body.title,
    star_rating: req.body.star_rating,
    rating_count: req.body.rating_count,
    description: req.body.description,
    category: req.body.category,
    bhp: req.body.bhp,
    mileage: req.body.mileage,
    fuel: req.body.fuel,
  });

  // Save CarReview in the database
  carreview
    .save(carreview)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the CarReview.",
      });
    });
};

// Retrieve all Car Review from the database.
exports.findAll = (req, res) => {
  debugger;
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  CarReview.find(condition)
    .then((data) => {
      var result = {};

      data.map((itm) => {
        result[itm.title] = {
          id: itm._id,
          title: itm.title,
          star_rating: itm.star_rating,
          rating_count: itm.rating_count,
          // // image: req.body.image,
          description: itm.description,
          category: itm.category,
          bhp: itm.bhp,
          mileage: itm.mileage,
          fuel: itm.fuel,
        };
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving CarReview.",
      });
    });
};

// Find a single CarReview with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  CarReview.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found CarReview with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving CarReview with id=" + id });
    });
};

// Update a CarReview by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  CarReview.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update CarReview with id=${id}. Maybe CarReview was not found!`,
        });
      } else res.send({ message: "CarReview was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating CarReview with id=" + id,
      });
    });
};

// Delete a CarReview with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  CarReview.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete CarReview with id=${id}. Maybe CarReview was not found!`,
        });
      } else {
        res.send({
          message: "CarReview was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Car review with id=" + id,
      });
    });
};
