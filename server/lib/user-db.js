const globals = require("../lib/globals"); //load global variables

var pgp = require("pg-promise")(/* options */);

class UserDb {
  getAll(callback) {
    const db = pgp(globals.postgreDbUrl);
    db.query("SELECT ${columns:name} FROM ${table:name}", {
      columns: ["user_name", "user_id"],
      table: "users"
    })
      .then(data => {
        console.log("DATA:", data);
        callback(data);
      })
      .catch(error => {
        console.error("dbase error", error);
        callback(null, error);
      })
      .finally(db.$pool.end);
  }

  logIn(userName, password, callback) {
    const db = pgp(globals.postgreDbUrl);
    db.any("SELECT * FROM users WHERE user_name = $1", [userName])
      .then(data => {
        console.log("DATA:", data);
        console.log("password:", password);
        const result = data[0];
        if (result.user_password === password) {
          delete result.user_password;
          callback(result);
        } else {
          const err = "passwords don't match";
          callback(null, err);
        }
      })
      .catch(error => {
        console.error("dbase error", error);
        callback(null, error);
      })
      .finally(db.$pool.end);
  }
}

module.exports = UserDb;
