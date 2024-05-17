const fs = require("fs");
const mongoose = require("mongoose");
const path = require("path");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const CompiledCode = require("./model/compiledCodes");

const jsonData = JSON.parse(fs.readFileSync("data.json", "utf8"));
async function insertData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    const result = await CompiledCode.insertMany(jsonData);
    console.log(`${result.length} documents inserted`);
  } catch (error) {
    console.error("Error occurred:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

insertData();
