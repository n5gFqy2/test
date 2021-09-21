const convict = require("convict");

// Define a schema
const config = convict({
  port: {
    ini: 4000
  },
  json: {
    limit: "10mb"
  },
  DB: {
    nameDB: "test",
    url: "mongodb+srv://test:iMCTbAMRpK3UPPg@cluster0.nkbg0.mongodb.net/test?retryWrites=true&w=majority"
  }
});

module.exports = config;
