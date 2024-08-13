const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
exports.db = () => {
    mongoose
        .connect(process.env.MONGO_URI)
        .then(() => {
            console.log("Connection established");
        })
        .catch((err) => {
            console.log(err.message);
        });
}; 