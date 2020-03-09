import Globals from '../lib/globals'; // load global variables
const globals = new Globals();

import { MongoClient } from 'mongodb';

export default class TasksDb {
  /**
   * Create and return a new MongoClient
   * @method connect
   * @async
   */
  async connect() {
    const client = MongoClient.connect(globals.mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    return client;
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
  async find(collection: string, query: object, sort = {}, projection = {}) {
    const client = await this.connect();
    const db = client.db(globals.mongoDbName);

    try {
      const r = await db
        .collection(collection)
        .find(query, {
          sort,
          projection,
        })
        .toArray();
      return r;
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err.stack);
    } finally {
      client.close();
    }
  }

  /**
   * Update a document in Mongo collection
   * @method update
   * @async
   *
   * @param {string} collection - name of collection
   * @param {object} Data - data object containing fields to update and/or add
   */
  async findOneAndUpdate(collection: string, filter: any, update: any) {
    const client = await this.connect();
    const db = client.db(globals.mongoDbName);
    try {
      const r = await db
        .collection(collection)
        .findOneAndUpdate(filter, update);
      return r;
    } catch (err) {
      // tslint:disable-next-line:no-console
      console.error(err.stack);
    } finally {
      client.close();
    }
  }

  getAll(callback: (result: any, error: string) => void) {
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

  assignTask(
    taskId: number,
    userId: number,
    callback: (result: any, error: string) => void
  ) {
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

module.exports = TasksDb;
