const globals = require("../lib/globals"); //load global variables

var pgp = require("pg-promise")(/* options */);

class UserDb {
  getAll(callback) {
    const db = pgp(globals.postgreDbUrl);
    db.any("select * from users", [])
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
    db.any("select * from users where user_name = $1", [userName])
      .then(data => {
        console.log("DATA:", data);
        console.log("password:", password);
        const result = data[0];
        if (result.user_password === password) {
          const user = {
            user_name: result.user_name,
            user_id: result.user_id
          };
          callback(user);
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
