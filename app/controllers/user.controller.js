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
  const user = new UserModel({
    email: req.body.email,
    fullName: req.body.fullName,
    password: req.body.password,
    age: req.body.age,
    gender: req.body.gender,
    birthDate: req.body.birthDate,
    address: req.body.address,
    avatar: req.body.avatar,
    role: 'user',
    phone: req.body.phone,
    status: 'active',
    timeCreated: new Date().getTime()
  });

  // Save User in the database
  UserModel.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send({
      status: 200,
      data: data,
      message: 'Created successfully !'
    });
  });
};

// Retrieve all User from the database.
exports.search = (req, res) => {
  UserModel.search(req.body, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User."
      });
    else {
      data.forEach(element => {
        delete element.password;
      });
      res.send(data)
    };
  });
};

// Find a single User with a userID
exports.getByID = (req, res) => {
  UserModel.getByID(req.body.userID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          message: `Not found User !`
        });
      } else {
        res.status(500).send({
          status: 500,
          message: "Error retrieving User !"
        });
      }
    } else res.send({
      status: 200,
      message: `Get data successfully !`,
      data: data
    });
  });
};

// Update a User identified by the userID in the request
exports.updateByID = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  UserModel.updateByID(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          message: `Not found User !`
        });
      } else {
        res.status(500).send({
          status: 500,
          message: err.message || "Some error occurred while creating the User."
        });
      }
    } else res.send({
      status: 200,
      message: `Updated successfully !`,
    });
  });
};

// Delete a User with the specified userID in the request
exports.deleteByID = (req, res) => {
  UserModel.deleteByID(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          message: `Not found User !`
        });
      } else {
        res.status(500).send({
          status: 500,
          message: `Could not delete User !`
        });
      }
    } else res.send({
      status: 200,
      message: `User was deleted successfully!`
    });
  });
};