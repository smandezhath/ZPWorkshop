const db = require("../models");
const Restaurant = db.restaurant;

// Create and Save a new Policy
exports.create = (req, res) => {
  debugger;
  debugger;
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a Restaurant
  const restaurant = new Restaurant({
    title: req.body.title,
    description: req.body.description,
    //image: req.body.image,
    category: req.body.category,
    company: req.body.company,
    model: req.body.model,
    yom: req.body.yom,
    mileage: req.body.mileage,
    price: req.body.price,
    review: req.body.review,
    reviewCount: req.body.reviewCount,
  });

  // Save Restaurant in the database
  restaurant
    .save(restaurant)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Restaurant.",
      });
    });
};

// Retrieve all Restaurant from the database.
exports.findAll = (req, res) => {
  debugger;
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Restaurant.find(condition)
    .then((data) => {
      var result = {};

      data.map((itm) => {
        result[itm.title] = {
          id: itm._id,
          title: itm.title,
          description: itmdescription,
          //image: itm.image,
          category: itm.category,
          company: itm.company,
          model: itm.model,
          yom: itm.yom,
          mileage: itm.mileage,
          price: itm.price,
          review: itm.review,
          reviewCount: itm.reviewCount,
        };
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Restaurant.",
      });
    });
};

// Find a single Restaurant with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Restaurant.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Restaurant with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Restaurant with id=" + id });
    });
};

// Update a Restaurant by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Restaurant.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Restaurant with id=${id}. Maybe Restaurant was not found!`,
        });
      } else res.send({ message: "Restaurant was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Restaurant with id=" + id,
      });
    });
};

// Delete a Restaurant with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Restaurant.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Restaurant with id=${id}. Maybe Restaurant was not found!`,
        });
      } else {
        res.send({
          message: "Restaurant was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Restaurant with id=" + id,
      });
    });
};
