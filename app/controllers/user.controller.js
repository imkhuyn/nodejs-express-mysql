const UserModel = require("../models/user.model.js");


exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  UserModel.login(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          message: `Not found User with email :  ${req.email} !`
        });
      } else {
        res.status(500).send({
          status: 500,
          message: `Error retrieving User with email : ${req.email} !`
        });
      }
    } else res.send({
      status: 200,
      message: `Logged in successfully !`,
      data: data
    });
  })
}

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    email: req.body.email,
    fullName: req.body.fullName,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    address: req.body.address,
    avatar: req.body.avatar,
    role: req.body.role,
    status: 'active',
    timeCreated: new Date().getTime()
  });

  // Save User in the database
  UserModel.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Retrieve all User from the database.
exports.findAll = (req, res) => {
  UserModel.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User."
      });
    else res.send(data);
  });
};

// Find a single User with a UserId
exports.findOne = (req, res) => {
  UserModel.findById(req.params.UserId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.UserId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.UserId
        });
      }
    } else res.send(data);
  });
};

// Update a User identified by the UserId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  UserModel.updateById(
    req.params.UserId,
    new User(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with id ${req.params.UserId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with id " + req.params.UserId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a User with the specified UserId in the request
exports.delete = (req, res) => {
  UserModel.remove(req.params.UserId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.UserId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.UserId
        });
      }
    } else res.send({
      message: `User was deleted successfully!`
    });
  });
};

// Delete all User from the database.
exports.deleteAll = (req, res) => {
  UserModel.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while removing all User."
      });
    else res.send({
      message: `All User were deleted successfully!`
    });
  });
};