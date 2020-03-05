const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

const UserDb = require("./lib/user-db");
const userDb = new UserDb();

const TasksDb = require("./lib/tasks-db");
const tasksDb = new TasksDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Point static path to dist (Angular app)
app.use(express.static(path.join(__dirname, "dist")));

app.get("/api/users", (req, res, next) => {
  userDb.getAll(function(results, error) {
    if (results) {
      res.json(results);
    } else if (error) {
      res.json({ error: error });
    }
  });
});

app.post("/api/login", (req, res, next) => {
  const userName = req.body.name;
  const password = req.body.password;
  userDb.logIn(userName, password, function(results, error) {
    if (results) {
      res.json(results);
    } else if (error) {
      res.json({ error: error });
    }
  });
});

app.get("/api/tasks", (req, res, next) => {
  tasksDb.getAll(function(results, error) {
    if (results) {
      res.json(results);
    } else if (error) {
      res.json({ error: error });
    }
  });
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
