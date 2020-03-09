import Globals from '../lib/globals'; // load global variables
const globals = new Globals();

import pgPromise from 'pg-promise';
const pgp = pgPromise();

export default class UserDb {
  getAll(callback: (result: any, error: string) => void) {
    const db = pgp(globals.postgreDbUrl);
    db.query('SELECT ${columns:name} FROM ${table:name}', {
      columns: ['user_name', 'user_id'],
      table: 'users',
    })
      .then((data: object[]) => {
        callback(data, '');
      })
      .catch((error: string) => {
        // tslint:disable-next-line:no-console
        console.error('dbase error', error);
        callback(null, error);
      })
      .finally(db.$pool.end);
  }

  logIn(
    userName: string,
    password: string,
    callback: (result: any, error: string) => void
  ) {
    const db = pgp(globals.postgreDbUrl);
    db.any('SELECT * FROM users WHERE user_name = $1', [userName])
      .then((data: object[]) => {
        const result: any = data[0];
        if (result.user_password === password) {
          delete result.user_password;
          callback(result, '');
        } else {
          const err = "passwords don't match";
          callback(null, err);
        }
      })
      .catch((error: string) => {
        // tslint:disable-next-line:no-console
        console.error('dbase error', error);
        callback(null, error);
      })
      .finally(db.$pool.end);
  }
}

module.exports = UserDb;
