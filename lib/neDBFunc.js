const { neDBConfig } = require("./neDBConfig.js");

const { customError } = require("./error.js");

//--------------------------
//--------------------------

//-------
// FIND
//-------
// Select Data
const SelectDataDB = async (coll , query={}) => {
  try {
    // Conection DB
    const db = await neDBConfig.createConection();

    // Get Data
		const result =  await db[coll].find(query);

		return result;

  } catch (e) {
    throw customError("Error neDB", "SelectDataDB", 500, e);
  }
};

//------
// ADD
//------

// Select Data
const AddDataDB = async (coll , query) => {
  try {
    // Conection DB
    const db = await neDBConfig.createConection();

    // Get Data
		const result =  await db[coll].insert(query);

		return result;

  } catch (e) {
    throw customError("Error neDB", "AddDataDB", 500, e);
  }
};


//--------
// UPDATE
//--------

// Select Data
const UpdateDB = async (coll , query , set='') => {
  try {
    // Conection DB
    const db = await neDBConfig.createConection();

    // Get Data
		const result =  await db[coll].update(
                                          query, 
                                          { $set: { dateUpdate : new Date() , ... set } }, { returnUpdatedDocs : true } 
                                          );

		return result;

  } catch (e) {
    throw customError("Error neDB", "UpdateDB", 500, e);
  }
};

//-------------------------------------------------
//-------------------------------------------------

module.exports.AddDataDB = AddDataDB;
module.exports.UpdateDB = UpdateDB;
module.exports.SelectDataDB = SelectDataDB;
