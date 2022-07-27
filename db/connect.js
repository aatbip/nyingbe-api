const mongoose = require("mongoose");

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB...");
  } catch (e) {
    console.log(e);
  }
};

module.exports = dbConnection;
