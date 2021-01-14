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
  let sql = `SELECT tl.*, u.fullName, u.email, u.phone, u.avatar 
  FROM TimeLine tl 
  INNER JOIN User u ON tl.userID = u.id AND u.status != 'inactive'
  WHERE tl.status != 'inactive'`;
  if (data.role == 'user') {
    sql = sql + ` AND u.id = ${data.userID}`;
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

  let start = new Date();
  start.setHours(0, 0, 0, 0);

  let end = new Date();
  end.setHours(23, 59, 59, 999);

  let sql = `SELECT tl.*
            FROM
              TimeLine tl 
            WHERE tl.userID = ${userID}
                AND tl.status != 'inactive'
                AND (tl.checkInTime IS NOT NULL AND tl.checkOutTime IS NOT NULL AND tl.checkInTime <= ${start} AND tl.checkOutTime >= ${end})
                  OR 
                    (tl.fromDate IS NOT NULL AND tl.toDate IS NOT NULL AND tl.fromDate <= ${toDay} AND tl.toDate >= ${toDay})
                  OR 
                    (tl.onDate IS NOT NULL AND tl.onDate = ${start})`;
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

TimeLine.search = result => {
  database.query("SELECT * FROM TimeLine", (err, res) => {
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