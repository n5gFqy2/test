
const Datastore = require('nedb-promises')

const { customError } = require("./error.js");

//--------------------------
//--------------------------

// Class neDB
class neDB {

	static getConection() {
    try {

     return {
            store: this._store, 
            items: this._items,
            itemsCheck: this._itemsCheck,
            nf: this._nf
            };

    } catch (e) {
      throw customError("Error neDB", "getConection", 500, e);
    }
  }

  static async createConection() {
    try {

			if (this._store && this._items && this._itemsCheck && this._nf ) {
        return neDB.getConection();
      }

      // in-Memory Coll
      this._store = await new Datastore();
      this._items = await new Datastore();
      this._itemsCheck = await new Datastore();
      this._nf = await new Datastore();

      // File-system
      // this._store = await new Datastore('./data/_store.db');
      // this._store.loadDatabase();

      // this._items = await new Datastore('./data/_items.db');
      // this._items.loadDatabase();

     return {
            store: this._store, 
            items: this._items,
            itemsCheck: this._itemsCheck,
            nf: this._nf
            };

    } catch (e) {
      throw customError("Error neDB", "createConection", 500, e);
    }
  }
}

module.exports.neDBConfig = neDB;
