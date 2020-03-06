import express from "express";
import path from "path";

import bodyParser from "body-parser";
import cors from "cors";

const app = express();

import UserDb from "./lib/user-db";
const userDb = new UserDb();

import TasksDb from "./lib/tasks-db";
const tasksDb = new TasksDb();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Point static path to dist (Angular app)
app.use(express.static(path.join(__dirname, "../../client/dist")));
app.use('/tasks', express.static(path.join(__dirname, "../../client/dist")));

app.get("/api/users", (req, res, next) => {
  userDb.getAll((results: any, error: string) => {
    if (results) {
      res.json(results);
    } else if (error) {
      res.json({ error });
    }
  });
});

app.post("/api/login", (req, res, next) => {
  const userName = req.body.name;
  const password = req.body.password;
  userDb.logIn(userName, password, (result: any, error: string) => {
    if (result) {
      res.json(result);
    } else if (error) {
      res.json({ error });
    }
  });
});

app.get("/api/tasks", (req, res, next) => {
  tasksDb.getAll((result: any, error: string) => {
    if (result) {
      res.json(result);
    } else if (error) {
      res.json({ error });
    }
  });
});

app.use((req, res, next) => {
  const err = new Error("Not Found");
  res.status(404);
  next(err);
});

app.use((err: any, req: any, res: any, next: any) => {
  res.status(err.status || 500);
  res.json({
    status: "error",
    error: err
  });
});

app.listen(3000, () => {
  // tslint:disable-next-line:no-console
  console.log("App listening on port 3000");
});
