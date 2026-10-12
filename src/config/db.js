const mongoose = require("mongoose");

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL)
        .then(() => {
            console.log("DB Connected");
            console.log("Database:", mongoose.connection.name);
            console.log("Host:", mongoose.connection.host);
        })
        .catch((err) => {
            console.log(err);
            process.exit(1);
        });
}

module.exports = connectToDB;