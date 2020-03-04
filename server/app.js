const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.get("/api/users", (req, res, next) => {
  res.json([
    { _id: 1, name: "michaelk" },
    { _id: 2, name: "jamesw" }
  ]);
});

app.post("/api/login", (req, res, next) => {
  const userName = req.body.name;
  const _id = userName == "michaelk" ? 1 : 2;

  res.json({ name: userName, _id: _id });
});

app.get("/api/tasks", (req, res, next) => {
  res.json([
    { _id: 1, name: "task1", assigned_user_id: 1 },
    { _id: 2, name: "task2", assigned_user_id: null },
    { _id: 3, name: "task3", assigned_user_id: 2 }
  ]);
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    status: "error",
    error: err
  });
});

app.listen(3000, () => {
  console.log("App listening on port 3000");
});
