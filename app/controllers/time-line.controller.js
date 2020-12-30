const TimeLineModel = require("../models/time-line.model.js");

// Create and Save a new TimeLine
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a TimeLine
  const timeLine = new TimeLineModel({
    fromDate: req.body.fromDate,
    toDate: req.body.toDate,
    onDate: req.body.onDate,
    reason: req.body.reason,
    note: req.body.note,
    checkInTime: req.body.checkInTime,
    checkOutTime: req.body.checkOutTime,
    userID: req.body.userID,
    status: 'active',
    timeCreated: new Date().getTime()
  });

  // Save TimeLine in the database
  TimeLineModel.create(timeLine, (err, data) => {
    if (err)
      res.status(500).send({
        status: 500,
        message: err.message || "Some error occurred while creating the TimeLine."
      });
    else res.send({
      status: 200,
      data: data,
      message: 'Created successfully !'
    });
  });
};

// Retrieve all TimeLine from the database.
exports.search = (req, res) => {
  TimeLineModel.search((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving TimeLine."
      });
    else res.send(data);
  });
};

exports.getHistory = (req, res) => {
  TimeLineModel.getHistory(req.body, (err, data) => {
    if (err) {
      res.status(500).send({
        status: 500,
        message: "Error retrieving TimeLine ! "
      });
    } else res.send({
      status: 200,
      message: `Get data successfully !`,
      data: data
    });
  });
};

// Find a single TimeLine with a userID
exports.getByUserID = (req, res) => {
  TimeLineModel.getByUserID(req.body.userID, (err, data) => {
    if (err) {
      res.status(500).send({
        status: 500,
        message: "Error retrieving TimeLine ! "
      });
    } else res.send({
      status: 200,
      message: `Get data successfully !`,
      data: data
    });
  });
};

// Update a TimeLine identified by the userID in the request
exports.updateByID = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  TimeLineModel.updateByID(req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          message: `Not found TimeLine !`
        });
      } else {
        res.status(500).send({
          status: 500,
          message: err.message || "Some error occurred while creating the TimeLine."
        });
      }
    } else res.send({
      status: 200,
      message: `Updated successfully !`,
    });
  });
};

// Delete a TimeLine with the specified userID in the request
exports.deleteByID = (req, res) => {
  TimeLineModel.deleteByID(req.params.userID, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          status: 404,
          message: `Not found TimeLine !`
        });
      } else {
        res.status(500).send({
          status: 500,
          message: `Could not delete TimeLine !`
        });
      }
    } else res.send({
      status: 200,
      message: `TimeLine was deleted successfully!`
    });
  });
};