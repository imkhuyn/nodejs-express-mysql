const database = require("./db.js");

// constructor
const User = function (User) {
  this.mail = User.email;
  this.fullName = User.fullName;
  this.password = User.password;
  this.age = User.age;
  this.gender = User.gender;
  this.birthDate = User.birthDate;
  this.address = User.address;
  this.avatar = User.avatar;
  this.role = User.role;
  this.status = User.status;
  this.timeCreated = User.timeCreated
};

User.login = (data, result) => {
  let sql = `SELECT * FROM User WHERE email = '${data.email}' AND password = '${data.password}' AND status = 'active'`;
  console.log(sql);
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      result(null, res[0]);
      return;
    }

    // not found User
    result({
      kind: "not_found"
    }, null);
  });
}

User.create = (newUser, result) => {
  database.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created User: ", {
      id: res.insertId,
      ...newUser
    });
    result(null, {
      id: res.insertId,
      ...newUser
    });
  });
};

User.findById = (UserId, result) => {
  database.query(`SELECT * FROM User WHERE id = ${UserId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({
      kind: "not_found"
    }, null);
  });
};

User.getAll = result => {
  database.query("SELECT * FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};

User.updateById = (id, User, result) => {
  database.query(
    "UPDATE User SET email = ?, name = ?, active = ? WHERE id = ?",
    [User.email, User.name, User.active, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({
          kind: "not_found"
        }, null);
        return;
      }

      console.log("updated User: ", {
        id: id,
        ...User
      });
      result(null, {
        id: id,
        ...User
      });
    }
  );
};

User.remove = (id, result) => {
  database.query("DELETE FROM User WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};

User.removeAll = result => {
  database.query("DELETE FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} User`);
    result(null, res);
  });
};

module.exports = User;