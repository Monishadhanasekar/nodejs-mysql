const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.json());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "moni123",
  database: "EmployeeDB",
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) console.log("DB connected successfully");
  else console.log("DB connection failed" + JSON.stringify(err));
});

app.listen(3000, () => {
  console.log("Express server is running at port no: 3000");
});

//Get all employees
app.get("/employees", (req, res) => {
  mysqlConnection.query("select * from Employee", (err, rows, fields) => {
    if (!err) res.send(rows);
    else console.log(err);
  });
});

//Get an single employee details
app.get("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "select * from Employee where EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      else console.log(err);
    }
  );
});

//Delete an employee details
app.delete("/employees/:id", (req, res) => {
  mysqlConnection.query(
    "Delete from Employee where EmpID = ?",
    [req.params.id],
    (err, rows, fields) => {
      if (!err) res.send("Deleted successfully");
      else console.log(err);
    }
  );
});

//Insert an employee
app.post("/employees", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err) res.send(rows);
      // rows.forEach((element) => {
      //   if (element.constructor == Array)
      //     res.send("Inserted employee id : " + element[0].EmpID);
      // });
      else console.log(err);
    }
  );
});

//Update an employee details
app.put("/employees", (req, res) => {
  let emp = req.body;
  var sql =
    "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
  mysqlConnection.query(
    sql,
    [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],
    (err, rows, fields) => {
      if (!err) res.send("Updated successfully");
      // rows.forEach((element) => {
      //   if (element.constructor == Array)
      //     res.send("Inserted employee id : " + element[0].EmpID);
      // });
      else console.log(err);
    }
  );
});
