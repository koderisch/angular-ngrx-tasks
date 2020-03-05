const MongoClient = require("mongodb").MongoClient;

const globals = require("../lib/globals"); //load global variables

class UserDb {
  /**
   * Create and return a new MongoClient
   * @method connect
   * @async
   */
  async connect() {
    const client = MongoClient.connect(globals.mongoDbUrl, {
      useNewUrlParser: true
    });
    console.log("Connected correctly to mongo server");
    return client;
  }

  /**
   * Find documents in Mongo collection
   * @method find
   * @async
   * @param {string} collection - name of the collection
   * @param {string} query - query string for find
   * @param {object} sort - object containing field to sort by (e.g. { name: 1 } to sort by field "name")
   * @param {object} projection - object containing fields to return with results (e.g. { name: true, description: true } to return fields "name" and "description" only)
   */
  async find(collection, query, sort = {}, projection = {}) {
    const client = await this.connect();
    const db = client.db(globals.mongoDbName);

    try {
      const r = await db
        .collection(collection)
        .find(query, {
          sort: sort,
          projection: projection
        })
        .toArray();
      return r;
    } catch (err) {
      console.log(err.stack);
    } finally {
      client.close();
    }
  }

  /**
   * Find documents in Mongo collection
   * @method findOne
   * @async
   *
   * @param {string} collection - name of the collection
   * @param {string} query - query string for find
   * @param {object} projection - object containing fields to return with results (e.g. { name: true, description: true } to return fields "name" and "description" only)
   */
  async findOne(collection, query, projection) {
    const client = await this.connect();
    const db = client.db(globals.mongoDbName);

    try {
      // find a single document
      const r = await db.collection(collection).findOne(query, {
        projection: projection
      });
      //console.log("r", r);
      return r;
    } catch (err) {
      console.log(err.stack);
    } finally {
      //close connection
      client.close();
    }
  }

  getAll(callback) {
    const collection = "users";
    const query = {};
    const sort = { name: 1 };
    const projection = {};
    this.find(collection, query, sort, projection)
      .catch(err => {
        console.error("dbase.find error", err);
        callback(null, err);
      })
      .then(result => {
        console.log(result);
        callback(result);
      });
  }

  logIn(userName, password, callback) {
    const collection = "users";
    const query = { name: userName };
    const sort = {};
    const projection = {};
    this.findOne(collection, query, sort, projection)
      .catch(err => {
        console.error("dbase.find error", err);
        callback(null, err);
      })
      .then(result => {
        console.log(result);
        if (result.password === password) {
          callback(result);
        } else {
          const err = "passwords don't match";
          callback(null, err);
        }
      });
  }
}

module.exports = UserDb;
