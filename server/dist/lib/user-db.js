"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = __importDefault(require("../lib/globals")); // load global variables
const globals = new globals_1.default();
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = pg_promise_1.default();
class UserDb {
    getAll() {
        return new Promise((resolve, reject) => {
            const db = pgp(globals.postgreDbUrl);
            db.query('SELECT ${columns:name} FROM ${table:name}', {
                columns: ['user_name', 'user_id'],
                table: 'users',
            })
                .then((data) => {
                resolve(data);
            })
                .catch((error) => {
                // tslint:disable-next-line:no-console
                console.error('dbase error', error);
                reject(error);
            })
                .finally(db.$pool.end);
        });
    }
    logIn(userName, password) {
        return new Promise((resolve, reject) => {
            const db = pgp(globals.postgreDbUrl);
            db.any('SELECT * FROM users WHERE user_name = $1', [userName])
                .then((data) => {
                const result = data[0];
                if (result.user_password === password) {
                    delete result.user_password;
                    resolve(result);
                }
                else {
                    const err = "passwords don't match";
                    reject(err);
                }
            })
                .catch((error) => {
                // tslint:disable-next-line:no-console
                console.error('dbase error', error);
                reject(error);
            })
                .finally(db.$pool.end);
        });
    }
}
exports.default = UserDb;
module.exports = UserDb;
//# sourceMappingURL=user-db.js.map