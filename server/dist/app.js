"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
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
app.use(express_1.default.static('static'));
app.use('/tasks', express_1.default.static('static'));
app.get('/api/users', (req, res, next) => {
    userDb.getAll().then((result) => {
        res.json(result);
    }, (error) => {
        res.json({ error });
    });
});
app.post('/api/login', (req, res, next) => {
    const userName = req.body.user_name;
    const password = req.body.password;
    userDb.logIn(userName, password).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({ error });
    });
});
app.get('/api/tasks', (req, res, next) => {
    tasksDb.getAll().then((result) => {
        res.json(result);
    }, (error) => {
        res.json({ error });
    });
});
app.post('/api/assigntask', body_parser_1.default.json(), (req, res, next) => {
    tasksDb.assignTask(req.body.task_id, req.body.user_id).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({ error });
    });
});
app.post('/api/addtask', body_parser_1.default.json(), (req, res, next) => {
    tasksDb.addTask(req.body.task_id, req.body.task_name).then((result) => {
        res.json(result);
    }, (error) => {
        res.json({ error });
    });
});
app.use((req, res, next) => {
    const err = new Error('Not Found');
    res.status(404);
    next(err);
});
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        status: 'error',
        error: err,
    });
});
app.listen(3000, () => {
    // tslint:disable-next-line:no-console
    console.log('App listening on port 3000');
});
//# sourceMappingURL=app.js.map