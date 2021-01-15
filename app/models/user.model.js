const database = require("./db.js");

// constructor
const User = function (user) {
  this.email = user.email;
  this.fullName = user.fullName;
  this.password = user.password;
  this.age = user.age;
  this.gender = user.gender;
  this.birthDate = user.birthDate;
  this.address = user.address;
  this.avatar = user.avatar;
  this.role = user.role;
  this.phone = user.phone;
  this.status = user.status;
  this.timeCreated = user.timeCreated
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
  let sql = `INSERT INTO User SET ?`;
  console.log(sql);
  database.query(sql, newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, {
      id: res.insertId,
      ...newUser
    });
  });
};

User.getByID = (userID, result) => {
  let sql = `SELECT * FROM User WHERE id = '${userID}' AND status != 'inactive'`;
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

    // not found User with the id
    result({
      kind: "not_found"
    }, null);
  });
};

User.search = (condition, result) => {
  let sql = `SELECT * FROM User WHERE status != 'inactive'`;
  if (condition.role && condition.role == 'admin') {
    sql = sql + ` AND role = user`
  }
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("User: ", res);
    result(null, res);
  });
};

User.updateByID = (data, result) => {
  let setSQL = ``;
  if (data.email) {
    setSQL = setSQL + ` email = '${data.email}',`;
  }
  if (data.fullName) {
    setSQL = setSQL + ` fullName = '${data.fullName}',`;
  }
  if (data.password) {
    setSQL = setSQL + ` password = '${data.password}',`;
  }
  if (data.phone) {
    setSQL = setSQL + ` phone = '${data.phone}',`;
  }
  if (data.age) {
    setSQL = setSQL + ` age = '${data.age}',`;
  }
  if (data.gender) {
    setSQL = setSQL + ` gender = '${data.gender}',`;
  }
  if (data.birthDate) {
    setSQL = setSQL + ` birthDate = '${data.birthDate}',`;
  }
  if (data.address) {
    setSQL = setSQL + ` address = '${data.address}',`;
  }
  if (data.avatar) {
    setSQL = setSQL + ` avatar = '${data.avatar}',`;
  }
  if (data.role) {
    setSQL = setSQL + ` role = '${data.role}',`;
  }
  let time = new Date().getTime();
  setSQL = setSQL + ` timeModified = ${time}`
  let sql = `UPDATE User SET ${setSQL} WHERE id = ${data.id}`;
  console.log(sql);
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    if (res) {
      result(null, res);
      return;
    }
  });
};

User.deleteByID = (userID, result) => {
  let sql = `UPDATE User SET status = 'inactive' WHERE id = ${userID}`;
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({
        kind: "not_found"
      }, null);
      return;
    }

    if (res) {
      result(null, res);
      return;
    }
  });
};

module.exports = User;