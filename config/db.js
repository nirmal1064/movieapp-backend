const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;

exports.connect = () => {
    mongoose.connect(MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        retryWrites: true
    }).then(() => {
        console.log("Connected to MongoDB Successfully");
    }).catch(err => {
        console.error("Connection error", err);
        process.exit();
    });
}
