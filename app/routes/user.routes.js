module.exports = app => {
  const userControler = require("../controllers/user.controller.js");

  // Login 
  app.post("/login", userControler.login);

  // Create a new user
  app.post("/user/create", userControler.create);

  // Retrieve all user
  app.post("/user/search", userControler.search);

  // Retrieve a single user with userId
  app.post("/user/getByID", userControler.getByID);

  // Update a user with userId
  app.post("/user/updateByID", userControler.updateByID);

  // Delete a user with userId
  app.post("/user/deleteByID", userControler.deleteByID);

};