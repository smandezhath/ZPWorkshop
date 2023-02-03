const db = require("../models");
const Policy = db.policies;

// Create and Save a new Policy
exports.create = (req, res) => {
  // Validate request
  if (!req.body.componentId) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a Policy
  const policy = new Policy({
    componentId: req.body.componentId,
    componentName: req.body.componentName,
    userTypes: req.body.userTypes,
    subscriptions: req.body.subscriptions,
    paymentTerms: req.body.paymentTerms,
    states: req.body.states,
    pagename: req.body.pagename,
    demo: req.body.demo ? req.body.demo : true,
  });

  // Save Policy in the database
  policy
    .save(policy)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Policy.",
      });
    });
};

// Retrieve all Policies from the database.
exports.findAll = (req, res) => {
  debugger;
  const componentId = req.query.componentId;
  var condition = componentId
    ? { componentId: { $regex: new RegExp(componentId), $options: "i" } }
    : {};

  Policy.find(condition)
    .then((data) => {
      var result = {};

      data.map((itm) => {
        result[itm.componentId] = {
          id: itm._id,
          userTypes: itm.userTypes,
          subscriptions: itm.subscriptions,
          paymentTerms: itm.paymentTerms,
          states: itm.states,
          pageName: itm.pagename,
          demo: itm.demo,
          createdAt: itm.createdAt,
          componentId: itm.componentId,
          componentName: itm.componentName,
        };
      });

      res.send(result);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving policies.",
      });
    });
};

// Find a single Policy with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Policy.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Policy with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Policy with id=" + id });
    });
};

// Update a policies by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Policy.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Policy with id=${id}. Maybe Policy was not found!`,
        });
      } else res.send({ message: "Policy was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Policy with id=" + id,
      });
    });
};

// Delete a Policies with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Policy.findByIdAndRemove(id, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Policies with id=${id}. Maybe Policies was not found!`,
        });
      } else {
        res.send({
          message: "Policies was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Policies with id=" + id,
      });
    });
};

//it should be renamed
module.exports.checkaccess = (req, res) => {
  debugger;
  const axios = require("axios");
  const variables = require("../../app/config/db.config");

  if (!req.body) {
    return res.status(400).send({
      message: "Data should be there for checking access!",
    });
  }

  const payload = {
    input: {
      pageName: req.body.pageName,
      userType: req.body.userType,
      companySubscription: req.body.companySubscription,
      location: req.body.location,
      paymentTerm: req.body.paymentTerm,
    },
  };

  var url = `${variables.opabaseUrl}${req.body.pageName}`;
  axios
    .post(url, payload)
    .then((resp) => {
      if (resp && resp.data) {
        res.send(resp.data);
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};
