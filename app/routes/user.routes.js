module.exports = app => {
  const user = require("../controllers/user.controller.js");

  // Create a new user
  app.post("/user/create", user.create);

  // Retrieve all user
  app.get("/user/search", user.findAll);

  // Retrieve a single user with userId
  app.get("/user/getByID/:userId", user.findOne);

  // Update a user with userId
  app.put("/user/updateByID/:userId", user.update);

  // Delete a user with userId
  app.delete("/user/deleteByID/:userId", user.delete);

  // Delete all user
  app.delete("/user/deleteAll", user.deleteAll);
};
