module.exports = app => {
  const userControler = require("../controllers/user.controller.js");

  // Login 
  app.post("/login", userControler.login);

  // Create a new user
  app.post("/user/create", userControler.create);

  // Retrieve all user
  app.get("/user/search", userControler.findAll);

  // Retrieve a single user with userId
  app.get("/user/getByID/:userId", userControler.findOne);

  // Update a user with userId
  app.put("/user/updateByID/:userId", userControler.update);

  // Delete a user with userId
  app.delete("/user/deleteByID/:userId", userControler.delete);

  // Delete all user
  app.delete("/user/deleteAll", userControler.deleteAll);
};
