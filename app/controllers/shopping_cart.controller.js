const db = require("../models");
const ShoppingCart = db.shoppingCart;

// Create and Save a new Policy
exports.create = (req, res) => {
  debugger;
  debugger;
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content cannot be empty!" });
    return;
  }

  // Create a ShoppingCart
  const shoppingCart = new ShoppingCart({
    title: req.body.title,
    description: req.body.description,
    detailedDescription: req.body.detailedDescription,
    //image: [{ type: Blob }],
    category: req.body.category,
    addToCart: req.body.addToCart,
    mileage: req.body.mileage,
    price: req.body.mileage,
    review: req.body.review,
    reviewCount: req.body.reviewCount,
  });

  // Save ShoppingCart in the database
  shoppingCart
    .save(shoppingCart)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the ShoppingCart.",
      });
    });
};

// Retrieve all ShoppingCart from the database.
exports.findAll = (req, res) => {
  debugger;
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  ShoppingCart.find(condition)
    .then((data) => {
      var result = {};

      data.map((itm) => {
        result[itm.title] = {
          id: itm._id,
          title: itm.title,
          description: itm.description,
          detailedDescription: itm.detailedDescription,
          //image: [{ type: Blob }],
          category: itm.category,
          addToCart: itm.addToCart,
          mileage: itm.mileage,
          price: itm.mileage,
          review: itm.review,
          reviewCount: itm.reviewCount,
        };
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving ShoppingCart.",
      });
    });
};

// Find a single ShoppingCart with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  ShoppingCart.findById(id)
    .then((data) => {
      if (!data)
        res
          .status(404)
          .send({ message: "Not found ShoppingCart with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving ShoppingCart with id=" + id });
    });
};

// Update a ShoppingCart by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  ShoppingCart.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update ShoppingCart with id=${id}. Maybe ShoppingCart was not found!`,
        });
      } else res.send({ message: "ShoppingCart was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating ShoppingCart with id=" + id,
      });
    });
};

// Delete a ShoppingCart with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ShoppingCart.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete ShoppingCart with id=${id}. Maybe ShoppingCart was not found!`,
        });
      } else {
        res.send({
          message: "ShoppingCart was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete ShoppingCart with id=" + id,
      });
    });
};
