
const dotenv = require('dotenv');
const mongoose = require( "mongoose");



const connectDB =  async()=>{
    try {
        const conn = await mongoose.connect("mongodb+srv://nithishkumar1446:VscJjS8oUBzXQJ6e@cluster0.8pcaohe.mongodb.net/Proshop?retryWrites=true&w=majority")
        console.log(`Mongoose connected with ${conn.connection.host}`)
    } catch (error) {
       console.log(`Error : ${error.message}`)
       process.exit(1);
    }
}

module.exports = connectDB;


// "scripts": {
//     "start": "node Backend/Server.js",
//     "server": "nodemon Backend/Server.js",
//     "client": "npm start --prefix frontend",
//     "dev": "concurrently \"npm run server\" \"npm run client\"",
//     "data:import":"node Backend/Seeder.js",
//     "data:destroy":"node Backend/Seeder.js -d"
//   },