module.exports = app => {
  const timeLine = require("../controllers/timeLine.controller.js");

  // Create a new timeLine
  app.post("/timeLine/create", timeLine.create);

  // Retrieve all timeLine
  app.get("/timeLine/search", timeLine.findAll);

  // Retrieve a single timeLine with timeLineId
  app.get("/timeLine/getByID/:timeLineId", timeLine.findOne);

  // Update a timeLine with timeLineId
  app.put("/timeLine/updateByID/:timeLineId", timeLine.update);

  // Delete a timeLine with timeLineId
  app.delete("/timeLine/deleteByID/:timeLineId", timeLine.delete);

  // Delete all timeLine
  app.delete("/timeLine/deleteAll", timeLine.deleteAll);
};