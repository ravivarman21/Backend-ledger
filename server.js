require('dotenv').config()

const app = require('./src/app.js');
const connectToDB = require('./src/config/db')


connectToDB();

app.listen(3000 , ()=>{
    console.log("server is runnung on the port 3000 ");
})

//clsconst client = new MongoClient("mongodb+srv://<db_username>:<db_password>@cluster0.mcp7lx7.mongodb.net/?appName=Cluster0");