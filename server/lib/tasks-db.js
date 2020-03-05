const MongoClient = require("mongodb").MongoClient;

const globals = require("../lib/globals"); //load global variables

class TasksDb {
  /**
   * Create and return a new MongoClient
   * @method connect
   * @async
   */
  async connect() {
    const client = MongoClient.connect(globals.mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true
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

  getAll(callback) {
    const collection = "tasks";
    const query = {};
    const sort = {};
    const projection = {};
    this.find(collection, query, sort, projection)
      .catch(err => {
        console.error("dbase.find error", err);
        callback(null, err);
      })
      .then(result => {
        callback(result);
      });
  }
}

module.exports = TasksDb;
