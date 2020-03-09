"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __importDefault(require("../lib/globals")); // load global variables
const globals = new globals_1.default();
const mongodb_1 = require("mongodb");
class TasksDb {
    /**
     * Create and return a new MongoClient
     * @method connect
     * @async
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            const client = mongodb_1.MongoClient.connect(globals.mongoDbUrl, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });
            return client;
        });
    }
    /**
     * Find documents in Mongo collection
     * @method find
     * @async
     * @param {string} collection - name of the collection
     * @param {object} query - query string for find
     * @param {object} sort - object containing field to sort by (e.g. { name: 1 } to sort by field "name")
     * @param {object} projection - object containing fields to return with results (e.g. { name: true, description: true } to return fields "name" and "description" only)
     */
    find(collection, query, sort = {}, projection = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.connect();
            const db = client.db(globals.mongoDbName);
            try {
                const r = yield db
                    .collection(collection)
                    .find(query, {
                    sort,
                    projection,
                })
                    .toArray();
                return r;
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.error(err.stack);
            }
            finally {
                client.close();
            }
        });
    }
    /**
     * Update a document in Mongo collection
     * @method update
     * @async
     *
     * @param {string} collection - name of collection
     * @param {object} Data - data object containing fields to update and/or add
     */
    findOneAndUpdate(collection, filter, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.connect();
            const db = client.db(globals.mongoDbName);
            try {
                const r = yield db
                    .collection(collection)
                    .findOneAndUpdate(filter, update);
                return r;
            }
            catch (err) {
                // tslint:disable-next-line:no-console
                console.error(err.stack);
            }
            finally {
                client.close();
            }
        });
    }
    getAll(callback) {
        const collection = 'tasks';
        const query = {};
        const sort = {};
        const projection = {};
        this.find(collection, query, sort, projection)
            .catch(err => {
            // tslint:disable-next-line:no-console
            console.error('dbase.find error', err);
            callback(null, err);
        })
            .then(result => {
            callback(result, '');
        });
    }
    assignTask(taskId, userId, callback) {
        const collection = 'tasks';
        const filter = { task_id: taskId };
        const update = { $set: { assigned_user_id: userId } };
        this.findOneAndUpdate(collection, filter, update)
            .catch(err => {
            // tslint:disable-next-line:no-console
            console.error('dbase.find error', err);
            callback(null, err);
        })
            .then(result => {
            callback(result, '');
        });
    }
}
exports.default = TasksDb;
module.exports = TasksDb;
//# sourceMappingURL=tasks-db.js.map