const mongoose = require('mongoose');
require('dotenv').config();
const connectDatabase = () => {
    const MONGO_URI = process.env.MONGO_URI;
    mongoose.connect(MONGO_URI)
        .then(() => {
            console.log("Mongoose Connected");
        });
}
module.exports = connectDatabase;