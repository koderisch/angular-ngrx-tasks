"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const app = express_1.default();
const user_db_1 = __importDefault(require("./lib/user-db"));
const userDb = new user_db_1.default();
const tasks_db_1 = __importDefault(require("./lib/tasks-db"));
const tasksDb = new tasks_db_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(cors_1.default());
// Point static path to dist (Angular app)
app.use(express_1.default.static(path_1.default.join(__dirname, "../../client/dist")));
// render /tasks from dist
app.get("/tasks", (res) => {
    res.sendFile(path_1.default.join(__dirname, "../../client/dist/index.html"));
});
app.get("/api/users", (req, res, next) => {
    userDb.getAll((results, error) => {
        if (results) {
            res.json(results);
        }
        else if (error) {
            res.json({ error });
        }
    });
});
app.post("/api/login", (req, res, next) => {
    const userName = req.body.name;
    const password = req.body.password;
    userDb.logIn(userName, password, (result, error) => {
        if (result) {
            res.json(result);
        }
        else if (error) {
            res.json({ error });
        }
    });
});
app.get("/api/tasks", (req, res, next) => {
    tasksDb.getAll((result, error) => {
        if (result) {
            res.json(result);
        }
        else if (error) {
            res.json({ error });
        }
    });
});
app.use((req, res, next) => {
    const err = new Error("Not Found");
    res.status(404);
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
    // tslint:disable-next-line:no-console
    console.log("App listening on port 3000");
});
//# sourceMappingURL=app.js.map