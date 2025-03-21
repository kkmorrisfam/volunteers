const mongoose = require("mongoose");

const connectDB = (url) => {
  return mongoose.connect(url, {
    serverSelectionTimeoutMS: 5000
  }).catch(err => console.log("error", err.reason));  //should come back as Authentication error with no password, but shows "undefined"
};

module.exports = connectDB;


/**
 * Another option is 
 * const connectDB = async (url) => {
 *   try {
 *      const connection = await mongoose.connect(url)
 *      
 *   } catch (err) {
 *     console.log(err)
 *     process.exit(1)  // 1 is for exit with failure
 *   }
 * }
 */