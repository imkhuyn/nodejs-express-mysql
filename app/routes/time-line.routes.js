module.exports = app => {
  const timeLineControler = require("../controllers/time-line.controller.js");

  // Create a new timeLine
  app.post("/timeLine/create", timeLineControler.create);

  // Retrieve all timeLine
  app.post("/timeLine/search", timeLineControler.search);

  // Retrieve a single timeLine with userId
  app.post("/timeLine/getByUserID", timeLineControler.getByUserID);

  app.post("/timeLine/getHistory", timeLineControler.getHistory);

  // Update a timeLine with userId
  app.post("/timeLine/updateByID", timeLineControler.updateByID);

  // Delete a timeLine with userId
  app.post("/timeLine/deleteByID", timeLineControler.deleteByID);

};