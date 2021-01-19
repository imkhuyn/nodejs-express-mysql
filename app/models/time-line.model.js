const database = require("./db.js");

// constructor
const TimeLine = function (timeLine) {
  this.reason = timeLine.reason;
  this.note = timeLine.note;
  this.fromDate = timeLine.fromDate;
  this.toDate = timeLine.toDate;
  this.onDate = timeLine.onDate;
  this.checkInTime = timeLine.checkInTime;
  this.checkOutTime = timeLine.checkOutTime;
  this.userID = timeLine.userID;
  this.status = timeLine.status;
  this.timeCreated = timeLine.timeCreated
};

TimeLine.create = (newTimeLine, result) => {
  let sql = `INSERT INTO TimeLine SET ?`;
  console.log(sql);
  database.query(sql, newTimeLine, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    result(null, {
      id: res.insertId,
      ...newTimeLine
    });
  });
};

TimeLine.getHistory = (data, result) => {
  let today = new Date().getTime();
  let sql = `SELECT tl.*, u.fullName, u.email, u.phone, u.avatar 
  FROM TimeLine tl 
  INNER JOIN User u ON tl.userID = u.id AND u.status != 'inactive'
  WHERE tl.status != 'inactive'`;
  if (data.role == 'user') {
    sql = sql + ` AND u.id = ${data.userID}`;
  }
  if (payload.fromDate != null && payload.fromDate != undefined && payload.fromDate != '' && !payload.toDate) {
    sql = sql + ` AND tl.timeCreated >= ${payload.fromDate}`
  }
  if (payload.toDate != null && payload.toDate != undefined && payload.toDate != '' && !payload.fromDate) {
    sql = sql + ` AND tl.timeCreated <= ${payload.fromDate}`
  }
  if (payload.fromDate != null && payload.fromDate != undefined && payload.fromDate != '' && payload.toDate != null && payload.toDate != undefined && payload.toDate != '') {
    sql = sql + ` AND tl.timeCreated BETWEEN ${payload.fromDate} and ${payload.toDate}`
  }
  sql = sql + ` ORDER BY tl.timeCreated DESC`;
  console.log(sql);
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res) {
      result(null, res);
      return;
    }
  });
};

TimeLine.getByUserID = (userID, result) => {
  let toDay = new Date().getTime();

  var d = new Date();
  var year = d.getUTCFullYear();
  var month = d.getUTCMonth();
  var day = d.getUTCDate();

  var startHour = Date.UTC(year, month, day, 0, 0, 0, 0);
  var endHour = startHour + 86400000 - 1;

  setTimeout(() => {
    let sql = `SELECT tl.*
            FROM
              TimeLine tl 
            WHERE tl.userID = ${userID}
                AND tl.status != 'inactive'`;
    console.log(sql);
    database.query(sql, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res) {
        result(null, res);
        return;
      }
    });
  }, 500);

};

TimeLine.search = (data, result) => {
  let sql = `SELECT tl.*, u.fullName, u.avatar, u.email, u.address 
  FROM TimeLine tl
  INNER JOIN User u ON u.id = tl.userID AND u.status != 'inactive'
  WHERE tl.status != 'inactive' `;
  if (data.role && data.role == 'admin') {
    sql = sql + `AND u.role = 'user' `
  }
  if (data.role && data.role == 'user') {
    sql = sql + `AND tl.userID = ${data.userID} `
  }
  if (data.fromDate && data.fromDate != null && data.fromDate != undefined) {
    sql = sql + `AND tl.timeCreated >= ${data.fromDate} `
  }
  if (data.toDate && data.toDate != null && data.toDate != undefined) {
    sql = sql + `AND tl.timeCreated <= ${data.toDate} `
  }
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("TimeLine: ", res);
    result(null, res);
  });
};

TimeLine.updateByID = (data, result) => {
  let setSQL = ``;
  if (data.checkOutTime) {
    setSQL = setSQL + ` checkOutTime = '${data.checkOutTime}',`;
  }
  let time = new Date().getTime();
  setSQL = setSQL + ` timeModified = ${time}`
  let sql = `UPDATE TimeLine SET ${setSQL} WHERE id = ${data.id}`;
  console.log(sql);
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found TimeLine with the id
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

TimeLine.deleteByID = (userID, result) => {
  let sql = `UPDATE TimeLine SET status = 'inactive' WHERE id = ${userID}`;
  database.query(sql, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.affectedRows == 0) {
      // not found TimeLine with the id
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

module.exports = TimeLine;