const mongoose = require("mongoose");

const connectDb = async (DATABASE_URL) => {
  try {
    const DB_OPTIONS = {
      dbName: "BestCompany",
    };
    await mongoose.connect(DATABASE_URL, DB_OPTIONS);
    console.log("connection successful");
  } catch (error) {
    console.log(error, "error");
  }
};
module.exports = connectDb;
